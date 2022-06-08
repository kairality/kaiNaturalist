from app.models.creation_mixin import CrUpMixin
from .db import db
from .creation_mixin import CrUpMixin
from .taxon_class import TaxonClass

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

    taxon_kingdom = db.relationship("TaxonKingdom", back_populates="taxon", uselist=False, lazy="selectin")
    taxon_phylum = db.relationship("TaxonPhylum", back_populates="taxon", uselist=False, lazy="selectin")
    taxon_class = db.relationship("TaxonClass", back_populates="taxon", uselist=False, lazy="selectin")
    taxon_order = db.relationship("TaxonOrder", back_populates="taxon", uselist=False, lazy="selectin")
    taxon_family = db.relationship("TaxonFamily", back_populates="taxon", uselist=False, lazy="selectin")

    observations = db.relationship("Observation", back_populates="taxon")
    identifications = db.relationship("Identification", back_populates="taxon")

    @property
    def coalesce(self):
        if self.taxon_family:
            return self.taxon_family
        if self.taxon_order:
            return self.taxon_order
        if self.taxon_class:
            return self.taxon_class
        if self.taxon_phylum:
            return self.taxon_phylum
        return self.taxon_kingdom

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
    def _parent(self):
        try:
            return self.coalesce.parent
        except:
            return None

    @property
    def _parent_taxon(self):
        parent = self._parent
        if not parent:
            return None;
        else:
            return parent.taxon

    @property
    def descendants(self):
        des = self.coalesce.descendants
        return [d.taxon for d in des]


    def to_dict(self):
        return {
            "id": self.id,
            "taxon_info": self.coalesce.to_dict(),
            "common_name": self.common_name,
            "scientific_name": self.scientific_name,
            "rank": self.rank.name,
            "external_url": self.external_url,
            "external_rank": self.external_rank,
            "parent": self._parent_taxon.id if self._parent else None,
            "parent_info": self._parent_taxon.to_dict() if self._parent else None,
            "parent_rank": self._parent.rank.name if self._parent else None,
            "descendants": [descendant.id for descendant in self.descendants]
        }
