from .db import db
from .taxon_mixin import TaxonMixin
from .taxon import Taxon

class TaxonFamily(db.Model, TaxonMixin):
    __tablename__ = 'taxon_families'
    parent_taxon_id = db.Column(db.Integer, db.ForeignKey("taxon_orders.id"), nullable=False)
    taxon = db.relationship("Taxon", back_populates="taxon_family", uselist=False)

    parent = db.relationship("TaxonOrder", back_populates="ancestors")

    @property
    def uncoalesce(self):
        taxon = Taxon.query.get(Taxon.family_id == self.id)
        return taxon;
