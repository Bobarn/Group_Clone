from .db import db

favorited_items = db.Table(
    "favorited_items",
    db.Model.metadata,
    db.Column("userId", db.ForeignKey("users.id")),
    db.Column("productId", db.ForeignKey("products.id"))
)
