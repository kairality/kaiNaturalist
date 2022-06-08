from .db import db
from .taxon_mixin import TaxonMixin
from .taxon import Taxon

class TaxonOrder(db.Model, TaxonMixin):
    __tablename__ = 'taxon_orders'
    parent_taxon_id = db.Column(db.Integer, db.ForeignKey("taxon_classes.id"))

    taxon = db.relationship("Taxon", back_populates="taxon_order", uselist=False, lazy="subquery")
    parent = db.relationship("TaxonClass", back_populates="ancestors", lazy="subquery")
    ancestors = db.relationship("TaxonFamily", back_populates="parent", lazy="subquery")

    @property
    def uncoalesce(self):
        taxon = Taxon.query.filter(Taxon.order_id == self.id and Taxon.family_id is None).first()
        return taxon;
