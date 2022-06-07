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

    @property
    def coalesce(self):
        return self.taxon_family or self.taxon_order or self.taxon_class or self.taxon_phylum or self.taxon_kingdom

    @property
    def rank(self):
        return self.coalesce.rank;

    @property
    def parent_rank(self):
        return self.coalesce.parent_rank

    @property
    def scientific_name(self):
        return self.coalesce.scientific_name
    @property
    def common_name(self):
        return self.coalesce.common_name

    @property
    def parent_taxon(self):
        return getattr(self.coalesce, "parent_taxon", None)

    def to_dict(self):
        return {
            "id": self.id,
            "taxon_info": self.coalesce.to_dict(),
            "common_name": self.common_name,
            "scientific_name": self.scientific_name,
            "rank": self.rank.name,
            "external_url": self.external_url,
            "external_rank": self.external_rank,
            "parent": self.parent_taxon.to_dict() if self.parent_taxon else None,
            "parent_rank": self.parent_taxon.rank.name if self.parent_taxon else None,
        }
