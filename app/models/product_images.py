from .db import db, environment, SCHEMA

class ProductImage(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    preview = db.Column(db.Boolean)

    product = db.relationship("Product", back_populates="images")
