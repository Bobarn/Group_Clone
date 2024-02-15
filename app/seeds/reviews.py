from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime
from random import randint
import random

f = Faker(locale='en_US')

generic_good_reviews = [
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

generic_fine_reviews = [
    "It's pretty good, exceeded my low expectations.",
    "Surprisingly decent, better than I thought.",
    "Not bad at all, pleasantly surprised.",
    "It's good enough, I can't complain.",
    "Solid performance, better than average.",
    "I quite liked it, better than expected.",
    "Not too shabby, exceeded my modest expectations.",
    "Impressed with its decent quality.",
    "It's actually not bad, exceeded my initial impressions.",
    "A solid choice, does the job well.",
    "Pretty decent product, happy with the purchase.",
    "Not bad for the price, exceeded my expectations.",
    "I was pleasantly surprised, it's quite good.",
    "It's above average, not a bad buy.",
    "Better than okay, I'm satisfied with it.",
    "Not too bad, a decent product overall.",
    "It's got its merits, better than some alternatives.",
    "Quite pleased with it, better than I anticipated.",
    "I'd say it's a good purchase, met my expectations.",
    "Definitely not bad, I'm content with it."
]

generic_okay_reviews = [
    "It's neither great nor terrible, just okay.",
    "Middle of the road – not impressed, not disappointed.",
    "Average product, meets expectations but doesn't exceed.",
    "It's okay, nothing to write home about.",
    "Does the job adequately, but lacks flair.",
    "Not bad, not fantastic – just your average product.",
    "Acceptable, but not noteworthy in any way.",
    "Meh, didn't really stand out to me.",
    "It's fine, but there's nothing remarkable about it.",
    "Fairly average, wouldn't say it's anything special.",
    "Met my expectations, but didn't go beyond.",
    "Adequate performance, nothing to rave about.",
    "Not bad, not good – just somewhere in between.",
    "Satisfactory, but not particularly impressive.",
    "It's alright, but I've seen better.",
    "Does what it's supposed to, but without any wow factor.",
    "Average quality, nothing to get excited about.",
    "It's okay, but I wouldn't go out of my way to recommend it.",
    "Middle-of-the-road product, not bad, not great.",
    "In the middle – not terrible, but not outstanding either."
]

generic_bad_reviews = ["Terrible product, avoid at all costs.",
    "Waste of money, regretting the purchase.",
    "Dreadful quality, fell apart within days.",
    "Disappointing performance, not worth it.",
    "Absolute garbage, wouldn't recommend to anyone.",
    "Unreliable and frustrating to use.",
    "Poorly made, broke soon after I got it.",
    "Not up to par, a total letdown.",
    "Stay away, it's a complete disaster.",
    "I expected better, but it's just awful.",
    "Faulty and unreliable, don't bother.",
    "Horrible experience, regret buying it.",
    "Cheaply made, fell apart within weeks.",
    "A total waste of time and money.",
    "I can't believe how bad this product is.",
    "Terrible customer service, no help at all.",
    "Incredibly disappointing, do not buy.",
    "Failed to meet even the lowest expectations.",
    "I wouldn't recommend this to my worst enemy.",
    "Awful quality, don't waste your money on this."
]

def seed_reviews():
    allReviews = []

    for i in range(1, 11):
        review = Review(
            userId=i,
            productId=random.randint(1, 60),
            reviewText=random.choice(generic_good_reviews),
            starRating=random.randint(4, 5),
            itemQual=random.randint(4, 5),
            shippingQual=random.randint(4, 5),
            serviceQual=random.randint(4, 5),
            created_at=datetime.now()
        )

        review2 = Review(
            userId=i,
            productId=random.randint(1, 60),
            reviewText=random.choice(generic_fine_reviews),
            starRating=random.randint(3, 4),
            itemQual=random.randint(3, 4),
            shippingQual=random.randint(3, 5),
            serviceQual=random.randint(3, 5),
            created_at=datetime.now()
        )

        review3 = Review(
            userId=i,
            productId=random.randint(1, 60),
            reviewText=random.choice(generic_okay_reviews),
            starRating=random.randint(2, 4),
            itemQual=random.randint(3, 4),
            shippingQual=random.randint(2, 3),
            serviceQual=random.randint(2, 4),
            created_at=datetime.now()
        )

        review4 = Review(
            userId=i,
            productId=random.randint(1, 60),
            reviewText=random.choice(generic_bad_reviews),
            starRating=random.randint(1, 2),
            itemQual=random.randint(1, 2),
            shippingQual=random.randint(1, 4),
            serviceQual=random.randint(1, 4),
            created_at=datetime.now()
        )

        review5 = Review(
            userId=i,
            productId=random.randint(1, 60),
            reviewText=random.choice(generic_good_reviews),
            starRating=random.randint(4, 5),
            itemQual=random.randint(4, 5),
            shippingQual=random.randint(4, 5),
            serviceQual=random.randint(4, 5),
            created_at=datetime.now()
        )

        review6 = Review(
            userId=i,
            productId=random.randint(1, 60),
            reviewText=random.choice(generic_fine_reviews),
            starRating=random.randint(3, 4),
            itemQual=random.randint(3, 4),
            shippingQual=random.randint(3, 5),
            serviceQual=random.randint(3, 5),
            created_at=datetime.now()
        )

        review7 = Review(
            userId=i,
            productId=random.randint(1, 60),
            reviewText=random.choice(generic_okay_reviews),
            starRating=random.randint(2, 4),
            itemQual=random.randint(3, 4),
            shippingQual=random.randint(2, 3),
            serviceQual=random.randint(2, 4),
            created_at=datetime.now()
        )

        review8 = Review(
            userId=i,
            productId=random.randint(1, 60),
            reviewText=random.choice(generic_bad_reviews),
            starRating=random.randint(1, 2),
            itemQual=random.randint(1, 2),
            shippingQual=random.randint(1, 4),
            serviceQual=random.randint(1, 4),
            created_at=datetime.now()
        )
        allReviews.append(review)
        allReviews.append(review2)
        allReviews.append(review3)
        allReviews.append(review4)
        allReviews.append(review5)
        allReviews.append(review6)
        allReviews.append(review7)
        allReviews.append(review8)
    db.session.add_all(allReviews)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
