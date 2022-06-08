from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Observation

observation_routes = Blueprint('observations', __name__)


@observation_routes.route('/')
def get_observations():
    observations = Observation.query.all()
    return {'observations': [observation.to_dict() for observation in observations]}

@observation_routes.route('/<int:id>')
def get_observation(id):
    observation = Observation.query.get(id)
    return Observation.to_dict()
