from app.models import db, User, Product, FavoritedItem, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint

def seed_favorites():

    for i in range(1, 11):
        our_user = User.query.get(i).id
        good_product = Product.query.get(randint(1, 60)).id

        new_favorite = FavoritedItem(userId=our_user, productId=good_product)
        #saved=True^
        db.session.add(new_favorite)


    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favoriteditems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favoriteditems"))

    db.session.commit()
