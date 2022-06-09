from app.models.identifications import Identification
from .db import db
from .creation_mixin import CrUpMixin
import datetime

class Observation(db.Model, CrUpMixin):
    __tablename__ = 'observations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey("users.id"), nullable=False)
    taxon_id = db.Column(db.Integer, db.ForeignKey("taxa.id"))
    img_url = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float(precision=32), nullable=False)
    longitude = db.Column(db.Float(precision=32), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.Date, nullable=False, default=datetime.date.today())
    verified = db.Column(db.Boolean, nullable=False, default=False)

    owner = db.relationship("User", back_populates="observations", lazy="joined")
    taxon = db.relationship("Taxon", back_populates="observations", lazy="joined")

    identifications = db.relationship("Identification", back_populates="observation", lazy="joined")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "taxon_id": self.taxon_id,
            "taxon": self.taxon.to_dict(),
            "img_url": self.img_url,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "description": self.description,
            "date": self.date,
            "verified": self.verified,
        }
