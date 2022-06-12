from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, FloatField, DateField
from wtforms.validators import DataRequired, ValidationError
from ..models import Observation, Taxon

def is_taxon(form, field):
    # Checking if user exists
    id = field.data
    if not id:
        return;
    taxon = Taxon.query.get(id)
    if not taxon:
        raise ValidationError('Taxon does not exist')


class ObservationForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    taxon_id = IntegerField('Taxon ID', validators=[is_taxon])
    latitude = FloatField('Latitude', validators=[DataRequired()])
    longitude = FloatField('Longitude', validators=[DataRequired()])
    date = DateField('Date', validators=[DataRequired()])
    description = TextAreaField('Description')
