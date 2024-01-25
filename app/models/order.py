from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    date = db.Column(db.DateTime, default=datetime.now)

    buyer = db.relationship("User", back_populates="orders")
    order_items = db.relationship("OrderItem",back_populates="order", cascade='all, delete-orphan')

    def to_dict(self):
        prices = [order_item.product.price * order_item.quantity for order_item in self.order_items]

        total = sum(prices)
        order_items = [order_item.to_dict() for order_item in self.order_items]

        return {
            "id": self.id,
            "buyer": self.buyer.to_dict(),
            "items": order_items,
            "total": total,
            "purchase_date": self.date
        }
