from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length

class OrderItemForm(FlaskForm):
    quantity = IntegerField("Quantity", validators=[DataRequired()])
    order_id = IntegerField("Order Id", validators=[DataRequired()])


    submit = SubmitField('Submit Product')
