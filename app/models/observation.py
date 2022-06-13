from app.models.identifications import Identification
from .db import db
from .creation_mixin import CrUpMixin
from .taxon import Taxon
import datetime
import collections

class Observation(db.Model, CrUpMixin):
    __tablename__ = 'observations'
    CONSENSUS_NUMBER = 2;
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey("users.id"), nullable=False)
    taxon_id = db.Column(db.Integer, db.ForeignKey("taxa.id"))
    img_url = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float(precision=32), nullable=False)
    longitude = db.Column(db.Float(precision=32), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.Date, nullable=False, default=datetime.date.today())
    verified = db.Column(db.Boolean, nullable=False, default=False)

    owner = db.relationship("User", back_populates="observations", lazy="selectin")
    taxon = db.relationship("Taxon", back_populates="observations", lazy="selectin")

    identifications = db.relationship("Identification", back_populates="observation", lazy="selectin", cascade="all, delete-orphan")

    @property
    def linked_identification(self):
        return next(filter(lambda ident: ident.user_id == self.user_id, self.identifications))

    @staticmethod
    def break_tie(taxon_list):
        pass

    @property
    def community_taxon(self):
        ids = [ident.taxon_id for ident in self.identifications]
        if not ids:
            return None;
        counts = collections.Counter(ids)
        print(counts)
        winning_count = max(counts.items(), key=lambda count: count[1])
        winning_count = winning_count[1]
        if winning_count < self.CONSENSUS_NUMBER:
            return None;
        else:
            winning_taxa = [id for id,count in counts.items() if count == winning_count]
            if len(winning_taxa) == 1:
                return Taxon.query.get(winning_taxa[0]).to_dict()
            else:
                return None

    @property
    def community_taxon_dict(self):
        ctaxon = self.community_taxon
        if ctaxon:
            return ctaxon.to_dict()
        else:
            return None


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user": {key:val for key, val in self.owner.to_dict().items() if key != 'email'},
            "taxon_id": self.taxon_id,
            "img_url": self.img_url,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "description": self.description,
            "date": self.date.strftime("%Y-%m-%d"),
            "identifications": [ident.id for ident in self.identifications],
            "verified": self.verified,
            "linked_identification_id": self.linked_identification.id,
            "community_taxon": self.community_taxon_dict,
            "created_at": self.created_at.timestamp(),
        }
