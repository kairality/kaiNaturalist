from .db import db
from .taxon_mixin import TaxonMixin

class TaxonClass(db.Model, TaxonMixin):
    __tablename__ = 'taxon_classes'
    parent_taxon_id = db.Column(db.Integer, db.ForeignKey("taxon_phyla.id"), nullable=False)

    taxon = db.relationship("Taxon", back_populates="taxon_class", uselist=False)
    parent_taxon = db.relationship("TaxonPhylum", back_populates="ancestors")
    ancestors = db.relationship("TaxonOrder", back_populates="parent_taxon")
