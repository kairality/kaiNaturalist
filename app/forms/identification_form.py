from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, DateField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length
from ..models import Observation, Taxon
from .observation_form import is_taxon;

class IdentificationForm(FlaskForm):
    observation_id = IntegerField("Observation ID", validators=[DataRequired("Unable to post an identification without an observation")])
    user_id = IntegerField('User ID', validators=[DataRequired()])
    taxon_id = IntegerField('Taxon ID', validators=[DataRequired("You must select an initial identification."), is_taxon])
    comment = TextAreaField('Comment', validators=[Length(max=300, message="Identification comments should be 300 characters or less.")])
