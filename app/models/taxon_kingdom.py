from app.models.taxon_mixin import TaxonMixin
from .db import db
from .taxon_mixin import TaxonMixin;

class TaxonKingdom(db.Model, TaxonMixin):
    __tablename__ = 'taxon_kingdoms'
    parent_taxon_id = db.Column(db.Integer)

    taxon = db.relationship("Taxon", back_populates="taxon_kingdom", uselist=False, lazy="joined")

    ancestors = db.relationship("TaxonPhylum", back_populates="parent_taxon")
