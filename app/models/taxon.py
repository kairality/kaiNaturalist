from app.models.creation_mixin import CrUpMixin
from .db import db
from .creation_mixin import CrUpMixin

class Taxon(db.Model, CrUpMixin):
    __tablename__ = 'taxa'
    id = db.Column(db.Integer, primary_key=True)
    kingdom_id = db.Column(db.Integer, db.ForeignKey("taxon_kingdoms.id"), nullable=False)
    phylum_id = db.Column(db.Integer, db.ForeignKey("taxon_phyla.id"))
    class_id = db.Column(db.Integer, db.ForeignKey("taxon_classes.id"))
    order_id = db.Column(db.Integer, db.ForeignKey("taxon_orders.id"))
    family_id = db.Column(db.Integer, db.ForeignKey("taxon_families.id"))
    external_url = db.Column(db.String(255))
    external_rank = db.Column(db.Integer)

    taxon_kingdom = db.relationship("TaxonKingdom", back_populates="taxon", uselist=False, lazy="joined")
    taxon_phylum = db.relationship("TaxonPhylum", back_populates="taxon", uselist=False, lazy="joined")
    taxon_class = db.relationship("TaxonClass", back_populates="taxon", uselist=False, lazy="joined")
    taxon_order = db.relationship("TaxonOrder", back_populates="taxon", uselist=False, lazy="joined")
    taxon_family = db.relationship("TaxonFamily", back_populates="taxon", uselist=False, lazy="joined")

    # def level(self):
    #     if getattr(self, 'family_id', None) is not None:
    #         return "family", self.family_id
    #     if getattr(self, 'class_id', None) is not None:
    #         return "class", self.class_id
    #     if getattr(self, 'phylum_id', None) is not None:
    #         return "phylum", self.phylum_id
    #     else:
    #         return "kingdom", self.kingdom_id;
