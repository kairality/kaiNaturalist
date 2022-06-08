from .db import db
from .taxon_mixin import TaxonMixin
from .taxon import Taxon

class TaxonPhylum(db.Model, TaxonMixin):
    __tablename__ = 'taxon_phyla'
    parent_taxon_id = db.Column(db.Integer, db.ForeignKey("taxon_kingdoms.id"))

    taxon = db.relationship("Taxon", back_populates="taxon_phylum", uselist=False, lazy="selectin")
    parent = db.relationship("TaxonKingdom", back_populates="descendants", lazy="selectin")
    descendants = db.relationship("TaxonClass", back_populates="parent", lazy="selectin")

    @property
    def uncoalesce(self):
        taxon = Taxon.query.filter(Taxon.phylum_id == self.id and Taxon.class_id is None).first()
        return taxon;
