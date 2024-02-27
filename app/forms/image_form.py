from flask_wtf import FlaskForm
from wtforms import SubmitField
# from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS import ALLOWED_EXTENSIONS



class ImageForm(FlaskForm):
    url = FileField("url", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit")
