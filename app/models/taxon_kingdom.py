from .db import db
from .taxon_mixin import TaxonMixin;
from .taxon import Taxon;

class TaxonKingdom(db.Model, TaxonMixin):
    __tablename__ = 'taxon_kingdoms'
    parent_taxon_id = db.Column(db.Integer)

    @property
    def uncoalesce(self):
        taxon = Taxon.query.filter(Taxon.kingdom_id == self.id and Taxon.phylum_id is None).first()
        return taxon

    taxon = db.relationship("Taxon", back_populates="taxon_kingdom", uselist=False)
    ancestors = db.relationship("TaxonPhylum", back_populates="parent")
