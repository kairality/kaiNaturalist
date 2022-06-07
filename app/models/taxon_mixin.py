from .db import db
from .creation_mixin import CrUpMixin
import enum

class TaxonRank(enum.Enum):
    KINGDOM = 1
    PHYLUM = 2
    CLASS = 3
    ORDER = 4
    FAMILY = 5



class TaxonMixin(CrUpMixin):
    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.Integer)
    scientific_name = db.Column(db.String(255), nullable=False)
    common_name = db.Column(db.String(255))
    rank = db.Column(db.Enum(TaxonRank), nullable=False)
    parent_rank = db.Column(db.Enum(TaxonRank))

    def to_dict(self):
        return {
            "id": self.id,
            "scientific_name": self.scientific_name,
            "common_name" : self.common_name,
        }
