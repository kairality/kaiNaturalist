from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import observation
from ..models import db, Observation, Identification, Taxon
from ..forms.identification_form import IdentificationForm
from ..utils.s3utils import get_unique_filename, upload_file_to_s3, allowed_file
from .route_utils import validation_errors_to_error_messages, check_ownership

identification_routes = Blueprint('identifications', __name__)

def recalculate_observation(observation_id):
    observation = Observation.query.get(observation_id)
    community_taxon_id = observation.community_taxon_id
    if community_taxon_id is not None:
        community_taxon = Taxon.query.get(community_taxon_id)
        observation.taxon = community_taxon;
        observation.verified = True
    else:
        ## consensus is off reset
        linked_ident = observation.linked_identification
        linked_taxon = linked_ident.taxon
        observation.taxon = linked_taxon
        observation.verified = False
    db.session.add(observation)
    db.session.commit()
    return Observation.query.get(id)


@identification_routes.route('/')
def get_idents():
    """
    Return all identifications
    """
    identifications = Identification.query.all()
    return {'identifications': [identification.to_dict() for identification in identifications]}

@identification_routes.route('/<int:id>')
@login_required
def get_identification(id):
    """
    Get a single identification
    """
    observation = Identification.query.get(id)
    return Identification.to_dict()


@identification_routes.route("/", methods=["POST"])
@login_required
def post_ident():
    """
    Create a new identification form form submission
    """
    user_id = current_user.id
    form = IdentificationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['user_id'].data = user_id
    if form.validate_on_submit():
        ident = Identification()
        form.populate_obj(ident)
        observation_id = ident.observation_id;
        db.session.add(ident)
        db.session.commit()
        observation = recalculate_observation(observation_id);
        return {'identification': ident.to_dict(), "observation": ident.observation.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@identification_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def del_identification(id):
    """
    Deletes an observation from the database
    """
    identification = Identification.query.get(id)
    observation_id = Identification.observation.id;
    permission_check = check_ownership(identification)
    if not permission_check:
        return {"errors": ["You can't modify that object"]}, 401
    if identification == observation.linked_identification:
        return {"errors": ["You can't delete the identification linked to your observation. You can update it or delete the observation instead"]}
    db.session.delete(identification)
    db.session.commit()
    observation = recalculate_observation(observation_id);
    return {'observation': observation.to_dict(), 'message': 'Identification deleted and observation recalculated'}
