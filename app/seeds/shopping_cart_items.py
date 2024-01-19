from app.models import db, ShoppingCartItem, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime
from random import randint

f = Faker(locale='en_US')


def seed_shopping_cart_items():
    allShoppingItems = []

    for i in range(1, 11):
        item = ShoppingCartItem(
            cartId=i,
            productId=randint(1, 60),
            created_at=datetime.now()
        )
        allShoppingItems.append(item)

    db.session.add_all(allShoppingItems)
    db.session.commit()

def undo_shopping_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_cart_items"))

    db.session.commit()
