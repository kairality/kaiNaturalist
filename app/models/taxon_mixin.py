from .db import db
from .creation_mixin import CrUpMixin

class TaxonMixin(CrUpMixin):
    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.Integer)
    scientific_name = db.Column(db.String(255), nullable=False)
    common_name = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "scientific_name": self.scientific_name,
            "common_name" : self.common_name,
        }
