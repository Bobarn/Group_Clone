from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime
from random import randint
import random

f = Faker(locale='en_US')

generic_reviews = [
    "Excellent product! I highly recommend it.",
    "Great value for the price. Very satisfied.",
    "Fantastic quality and exceeded my expectations.",
    "Simple and effective. Does the job well.",
    "Versatile and easy to use. A must-have!",
    "Impressed with the durability and design.",
    "Reliable and consistent performance.",
    "Outstanding craftsmanship. Well done!",
    "Perfect for everyday use. Couldn't be happier.",
    "Highly functional and user-friendly.",
    "Sleek and stylish. Adds a touch of elegance.",
    "Great customer service. Resolved my issues promptly.",
    "Innovative design. Stands out from the rest.",
    "Efficient and practical. Makes life easier.",
    "A game-changer. Revolutionized my routine.",
    "Solid choice for anyone in need of quality.",
    "Beautifully crafted. Love the attention to detail.",
    "Very impressed with the features and functionality.",
    "Easy to assemble and use. Great for beginners.",
    "Well worth the investment. Delighted with my purchase."
]


def seed_reviews():
    allReviews = []

    for i in range(1, 11):
        review = Review(
            userId=i,
            productId=random.randint(1, 18),
            reviewText=f.text(),
            starRating=random.randint(1, 5),
            itemQual=random.randint(1, 5),
            shippingQual=random.randint(1, 5),
            serviceQual=random.randint(1, 5),
            created_at=datetime.now()
        )
        allReviews.append(review)
    db.session.add_all(allReviews)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
