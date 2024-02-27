from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    image_name = db.Column(db.String(255))
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    preview = db.Column(db.Boolean)

    product = db.relationship("Product", back_populates="images")

    def to_dict(self):

        return {
                "id": self.id,
                "url": self.url,
                "imageName": self.image_name,
                "productId": self.productId,
                "preview": self.preview
        }
