from .db import db
from .taxon_mixin import TaxonMixin

class TaxonFamily(db.Model, TaxonMixin):
    __tablename__ = 'taxon_families'
    parent_taxon_id = db.Column(db.Integer, db.ForeignKey("taxon_orders.id"), nullable=False)

    taxon = db.relationship("Taxon", back_populates="taxon_family", uselist=False)

    parent_taxon = db.relationship("TaxonOrder", back_populates="ancestors")
