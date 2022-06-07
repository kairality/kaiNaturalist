from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Taxon

taxonomy_routes = Blueprint('taxonomy', __name__)


@taxonomy_routes.route('/')
@login_required
def taxonomy():
    taxa = Taxon.query.all()
    return {'taxa': taxon.to_dict() for taxon in taxa}


@taxonomy_routes.route('/<int:id>')
@login_required
def taxon(id):
    user = Taxon.query.get(id)
    return Taxon.to_dict();
