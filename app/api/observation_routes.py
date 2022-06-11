from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import observation
from ..models import db, Observation
from ..forms.observation_form import ObservationForm
from ..utils.s3utils import get_unique_filename, upload_file_to_s3, allowed_file
from .route_utils import validation_errors_to_error_messages, check_ownership

observation_routes = Blueprint('observations', __name__)


@observation_routes.route('/')
def get_observations():
    """
    Return all observations
    """
    observations = Observation.query.all()
    return {'observations': [observation.to_dict() for observation in observations]}

@observation_routes.route("/", methods=["POST"])
@login_required
def post_observation():
    """
    Create a new observation form form submission
    """
    user_id = current_user.id
    if "image" not in request.files:
        return {'errors': ["Image is required"]}, 401
    else:
        form = ObservationForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['user_id'].data = user_id
        if form.validate_on_submit():
            image = request.files["image"]
            if not allowed_file(image.filename):
                return {"errors": ["file type not supported"]}
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if ("url") not in upload:
                #yikes
                return upload, 400
            url = upload["url"]
            observation = Observation(img_url=url)
            form.populate_obj(observation)
            db.session.add(observation)
            db.session.commit()
            return observation.to_dict()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@observation_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def patch_observation(id):
    """
    Edits an observation
    """
    user_id = current_user.id
    observation = Observation.query.get(id)
    permission_check = check_ownership(observation);
    if not permission_check:
        return {"errors": ["You can't modify that object"]}, 401
    if not observation:
        return {"errors": f"No observation with id {id} exists"}, 404
    else:
        form = ObservationForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['user_id'].data = user_id;
        if form.validate_on_submit():
            form.populate_obj(observation)
            db.session.commit()
            return observation.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403

@observation_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def del_observation(id):
    """
    Deletes an observation from the database
    """
    observation = Observation.query.get(id)
    permission_check = check_ownership(observation)
    if not permission_check:
        return {"errors": ["You can't modify that object"]}, 401
    db.session.delete(observation)
    db.session.commit()
    return f'Observation id:{id} deleted';


@observation_routes.route('/<int:id>')
@login_required
def get_observation(id):
    """
    Get a single observation
    """
    observation = Observation.query.get(id)
    return Observation.to_dict()
