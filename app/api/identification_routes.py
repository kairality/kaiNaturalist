from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import observation
from ..models import db, Observation, Identification
from ..forms.observation_form import ObservationForm
from ..utils.s3utils import get_unique_filename, upload_file_to_s3, allowed_file
from .route_utils import validation_errors_to_error_messages, check_ownership

identification_routes = Blueprint('identifications', __name__)


@identification_routes.route('/')
def get_idents():
    """
    Return all identifications
    """
    identifications = Identification.query.all()
    return {'identification': [identification.to_dict() for identification in identifications]}

@identification_routes.route('/<int:id>')
@login_required
def get_identification(id):
    """
    Get a single identification
    """
    observation = Identification.query.get(id)
    return Identification.to_dict()
