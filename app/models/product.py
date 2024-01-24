from .db import db, SCHEMA, environment
from datetime import datetime
from .favorited_items import FavoritedItem

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
    favorited_items = db.relationship("FavoritedItem", back_populates="product", cascade='all, delete-orphan')
    images = db.relationship("ProductImage", back_populates="product", cascade='all, delete-orphan')
    reviews = db.relationship("Review", back_populates="product", cascade='all, delete-orphan')
    buying = db.relationship("OrderItem", back_populates="product")


    def to_dict(self):
        reviews_length = len(self.reviews)
        preview_image = None
        if self.images:
            preview_image = self.images[0].url

        product_dict =  {

            "id": self.id,
            "seller": self.seller.to_dict(),
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "category": self.category,
            "free_shipping":self.free_shipping,
            "reviews":reviews_length,
            "return_policy":self.return_policy,
            "shipping_time": self.shipping_time,
            "preview_image": preview_image

        }
        return product_dict
