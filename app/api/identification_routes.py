from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import observation
from ..models import db, Observation, Identification
from ..forms.identification_form import IdentificationForm
from ..utils.s3utils import get_unique_filename, upload_file_to_s3, allowed_file
from .route_utils import validation_errors_to_error_messages, check_ownership

identification_routes = Blueprint('identifications', __name__)


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
        db.session.add(ident)
        db.session.commit()
        return {'identification': {ident.to_dict()}, "observation": ident.observation.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
