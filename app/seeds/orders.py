from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

f = Faker(locale='en_US')

def seed_orders():
    allOrders = []

    for i in range(1, 11):
        newOrder = Order(
            buyer_id=i,
        )

        allOrders.append(newOrder)

    db.session.add_all(allOrders)
    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
