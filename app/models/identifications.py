from .db import db
from .creation_mixin import CrUpMixin

class Identification(db.Model, CrUpMixin):
    __tablename__ = 'identifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey("users.id"), nullable=False)
    observation_id = db.Column(db.Integer,  db.ForeignKey("observations.id"), nullable=False)
    taxon_id = db.Column(db.Integer, db.ForeignKey("taxa.id"))
    comment = db.Column(db.Text)

    author = db.relationship("User", back_populates="identifications", lazy="joined")
    taxon = db.relationship("Taxon", back_populates="identifications", lazy="joined")
    observation = db.relationship("Observation", back_populates="identifications", lazy="joined")
