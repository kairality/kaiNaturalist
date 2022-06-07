from .db import db
from .creation_mixin import CrUpMixin

class TaxonMixin(CrUpMixin):
    id = db.Column(db.Integer, primary_key=True)
    scientific_name = db.Column(db.String(255), nullable=False)
    common_name = db.Column(db.String(255))
