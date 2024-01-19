from app.models import db, User, Product, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint

def seed_favorites():

    for i in range(1, 11):
        our_user = User.query.get(i)

        good_product = Product.query.get(randint(1, 60))

        our_user.favorites.append(good_product)

        db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorited_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorited_items"))

    db.session.commit()
