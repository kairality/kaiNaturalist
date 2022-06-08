from .db import db
from .taxon_mixin import TaxonMixin
# from .taxon import Taxon;

class TaxonClass(db.Model, TaxonMixin):
    __tablename__ = 'taxon_classes'
    parent_taxon_id = db.Column(db.Integer, db.ForeignKey("taxon_phyla.id"), nullable=False)

    taxon = db.relationship("Taxon", back_populates="taxon_class", uselist=False, lazy="subquery")
    parent = db.relationship("TaxonPhylum", back_populates="ancestors", lazy="subquery")
    ancestors = db.relationship("TaxonOrder", back_populates="parent", lazy="subquery")

    # @property
    # def uncoalesce(self):
    #     taxon = Taxon.query.filter(Taxon.class_id == self.id and Taxon.family_id is None).first()
    #     return taxon;
