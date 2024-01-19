from .db import db, environment, SCHEMA
from datetime import datetime



class ShoppingCartItem(db.Model):
    __tablename__ = "shopping_cart_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cartId = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    cart = db.relationship("Cart", back_populates="products")
    product = db.relationship("Product", back_populates="buying")
