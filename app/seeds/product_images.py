from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

f = Faker(locale='en_US')

def seed_product_images():
    allImages = []

    for i in range(1, 61):
        newImage = ProductImage(
            url=f.image_url(),
            productId=i,
            preview=True
        )

        allImages.append(newImage)

    db.session.add_all(allImages)
    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
