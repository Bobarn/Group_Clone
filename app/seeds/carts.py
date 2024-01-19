from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

f = Faker(locale='en_US')

def seed_carts():
    allCarts = []

    for i in range(1, 11):
        newCart = Cart(
            buyer_id=i
        )

        allCarts.append(newCart)

    db.session.add_all(allCarts)
    db.session.commit()

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
