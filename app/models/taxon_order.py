from .db import db
from .taxon_mixin import TaxonMixin

class TaxonOrder(db.Model, TaxonMixin):
    __tablename__ = 'taxon_orders'
    parent_taxon_id = db.Column(db.Integer, db.ForeignKey("taxon_classes.id"))

    taxon = db.relationship("Taxon", back_populates="taxon_order", uselist=False)
    parent_taxon = db.relationship("TaxonClass", back_populates="ancestors")
    ancestors = db.relationship("TaxonFamily", back_populates="parent_taxon")
    