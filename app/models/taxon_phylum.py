from .db import db
from .taxon_mixin import TaxonMixin

class TaxonPhylum(db.Model, TaxonMixin):
    __tablename__ = 'taxon_phyla'
    parent_taxon_id = db.Column(db.Integer, db.ForeignKey("taxon_kingdoms.id"))

    taxon = db.relationship("Taxon", back_populates="taxon_phylum", uselist=False)
    parent_taxon = db.relationship("TaxonKingdom", back_populates="ancestors")
    ancestors = db.relationship("TaxonClass", back_populates="parent_taxon")
