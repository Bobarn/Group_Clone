from app.models import db, OrderItem, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime
from random import randint

f = Faker(locale='en_US')


def seed_order_items():
    allOrderItems = []

    for i in range(1, 11):
        item = OrderItem(
            order_id=i,
            product_id=randint(1, 60),
            created_at=datetime.now()
        )
        allOrderItems.append(item)

    db.session.add_all(allOrderItems)
    db.session.commit()

def undo_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_items"))

    db.session.commit()
