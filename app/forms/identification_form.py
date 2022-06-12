from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, DateField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from ..models import Observation, Taxon
from .observation_form import is_taxon;

class IdentificationForm(FlaskForm):
    observation_id = IntegerField("Observation ID", validators=[DataRequired()])
    user_id = IntegerField('User ID', validators=[DataRequired()])
    taxon_id = IntegerField('Taxon ID', validators=[is_taxon])
    comment = TextAreaField('Comment')
