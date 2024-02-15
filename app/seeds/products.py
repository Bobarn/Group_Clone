from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime
from random import randint
import random

clothing_items = [
    '',
    "Cotton T-shirt",
    "Denim Jeans",
    "Leather Jacket",
    "Summer Dress",
    "Sweatshirt",
    "Khaki Shorts",
    "Striped Polo Shirt",
    "Wool Sweater",
    "Cargo Pants",
    "Blazer",
    "Maxi Skirt",

]
jewelry_items = [
    '',
    "Diamond Necklace",
    "Pearl Earrings",
    "Sapphire Bracelet",
    "Emerald Ring",
    "Gold Chain",
    "Ruby Pendant",
    "Silver Hoop Earrings",
    "Amethyst Brooch",
    "Platinum Wedding Band",
    "Garnet Anklet",
    "Rose Gold Charm Bracelet",

]

returnPolicy = [

]

art_items= [
    '',
    "Oil Painting",
    "Abstract Sculpture",
    "Watercolor Landscape",
    "Contemporary Art",
    "Digital Art",
    "Portrait Drawing",
    "Street Art",
    "Ceramic Pottery",
    "Photorealistic Painting",
    "Surreal Art",

]

art_supplies = [
    '',
    "Acrylic Paint Set",
    "Sketchbook with Drawing Pencils",
    "Watercolor Palette",
    "Canvas Panels",
    "Oil Painting Brushes",
    "Pastel Set",
    "Palette Knife",
    "Linoleum Carving Tools",
    "Calligraphy Pen Set",
    "Mixed Media Paper"
]

electronics_items = [
    '',
    "Smartphone",
    "Laptop",
    "Wireless Headphones",
    "Smart TV",
    "Digital Camera",
    "Gaming Console",
    "Fitness Tracker",
    "Bluetooth Speaker",
    "Drone",
    "Tablet"
]

pet_supplies = [
    '',
    "Dog Food",
    "Cat Litter",
    "Pet Bed",
    "Fish Tank",
    "Bird Cage",
    "Leash and Collar Set",
    "Pet Grooming Kit",
    "Hamster Wheel",
    "Reptile Heat Lamp",
    "Rabbit Hutch"
]

generic_descriptions = [
    "Versatile and functional item for everyday use.",
    "Timeless piece suitable for any occasion.",
    "Stylish choice with a touch of modern flair.",
    "Comfortable and practical for various needs.",
    "Cozy option to bring warmth to any space.",
    "Casual and laid-back for a relaxed atmosphere.",
    "Energetic and dynamic item for active lifestyles.",
    "Warm and inviting addition to your surroundings.",
    "Versatile option with practical features.",
    "Sharp and polished choice for a refined look.",
    "Elegant and sophisticated piece for any setting.",
    "Relaxed and comfortable for a stress-free experience.",
    "Eye-catching and stylish addition to your collection.",
    "Functional and practical for your daily activities.",
    "Classic and timeless for a lasting impression.",
    "Trendy and fashionable choice for a modern touch.",
    "Practical and reliable for everyday tasks.",
    "Sleek and versatile to enhance your space.",
    "Luxurious and indulgent for added comfort.",
    "Fashion-forward item to elevate your surroundings."
]


f = Faker(locale='en_US')



def seed_products():
    allProducts = []
    for i in range(1, 11):
        jewelry = Product(
            name=jewelry_items[i],
            sellerId=i,
            price = f.random_number(digits=2),
            description=random.choice(generic_descriptions),
            category="Jewelry",
            created_at=datetime.now(),
            free_shipping=random.choice([True, False]),
            shipping_time=random.choice([14, 7, 2]),
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns']))
        clothes = Product(
            name=clothing_items[i],
            sellerId=i,
            price = f.random_number(digits=2),
            description=random.choice(generic_descriptions),
            category="Clothes",
            created_at=datetime.now(),
            free_shipping=random.choice([True, False]),
            shipping_time=random.choice([14, 7, 2]),
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        art = Product(
            name=art_items[i],
            sellerId=i,
            price = f.random_number(digits=2),
            description=random.choice(generic_descriptions),
            category="Art",
            created_at=datetime.now(),
            free_shipping=random.choice([True, False]),
            shipping_time=random.choice([14, 7, 2]),
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        crafts_supplies = Product(
            name=art_supplies[i],
            sellerId=i,
            price = f.random_number(digits=2),
            description=random.choice(generic_descriptions),
            category="Art Supplies",
            created_at=datetime.now(),
            free_shipping=random.choice([True, False]),
            shipping_time=random.choice([14, 7, 2]),
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        electronics = Product(
            name=electronics_items[i],
            sellerId=i,
            price = f.random_number(digits=2),
            description=random.choice(generic_descriptions),
            category="Electronics",
            created_at=datetime.now(),
            free_shipping=random.choice([True, False]),
            shipping_time=random.choice([14, 7, 2]),
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )

        pets = Product(
            name=pet_supplies[i],
            sellerId=i,
            price = f.random_number(digits=2),
            description=random.choice(generic_descriptions),
            category="Pet Supplies",
            created_at=datetime.now(),
            free_shipping=random.choice([True, False]),
            shipping_time=random.choice([14, 7, 2]),
            return_policy=random.choice(['90 day return', 'Must be unopened and unused', 'No returns'])
        )



        allProducts.append(jewelry)
        allProducts.append(clothes)
        allProducts.append(art)
        allProducts.append(crafts_supplies)
        allProducts.append(electronics)
        allProducts.append(pets)
    db.session.add_all(allProducts)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
