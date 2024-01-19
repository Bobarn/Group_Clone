from .db import db, SCHEMA, environment
from datetime import datetime
from .favorited_items import favorited_items

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(4, 2), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(30), nullable=False)
    free_shipping = db.Column(db.Boolean)
    return_policy = db.Column(db.Text)
    shipping_time = db.Column(db.Integer)
    sellerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    seller = db.relationship("User", back_populates="products")
    users = db.relationship("User", secondary=favorited_items, back_populates="favorites")
    images = db.relationship("ProductImage", back_populates="product", cascade='all, delete-orphan')
    reviews = db.relationship("Review", back_populates="product", cascade='all, delete-orphan')
    buying = db.relationship("ShoppingCartItem", back_populates="product")
