from .db import db, environment, SCHEMA

class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    buyer = db.relationship("User", back_populates="cart")
    products = db.relationship("ShoppingCartItem",back_populates="cart")
