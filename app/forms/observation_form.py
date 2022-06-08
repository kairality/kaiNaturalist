from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
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
    user_id = IntegerField('owner_id', validators=[DataRequired()])
    taxon_id = IntegerField('taxon_id', validators=[is_taxon])
    latitude = FloatField('latitude', validators=[DataRequired()])
    longitude = FloatField('longitude', validators=[DataRequired()])
    description = StringField('description')
