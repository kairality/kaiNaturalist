from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(max=40, message="Username must be 40 characters or less"),  username_exists])
    email = StringField('email', validators=[DataRequired("You must provide an e-mail address"), user_exists, Email("That doesn't seem to be a valid e-mail address")])
    password = StringField('password', validators=[DataRequired()])
