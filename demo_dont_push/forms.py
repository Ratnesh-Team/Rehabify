from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Email

class UserRegistrationForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Register')

class NGORegistrationForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    ngo_name = StringField('NGO Name', validators=[DataRequired()])
    submit = SubmitField('Register')

class NMKRegistrationForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    nmk_name = StringField('NMK Name', validators=[DataRequired()])
    submit = SubmitField('Register')

class LoginForm(FlaskForm):
    user_type = SelectField('User Type', choices=[('user', 'User'), ('ngo', 'NGO'), ('nmk', 'NMK')])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')