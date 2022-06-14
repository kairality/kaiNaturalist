from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Observation, Identification

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/observations')
@login_required
def get_user_observations(id):
    observations = Observation.query.filter(Observation.user_id == id).all()
    return {"observations": [observation.id for observation in observations]}

@user_routes.route('/<int:id>/identifications')
@login_required
def get_user_identifications(id):
    identifications = Identification.query.filter(Identification.user_id == id).all()
    return {"identifications": [identification.id for identification in identifications]}
