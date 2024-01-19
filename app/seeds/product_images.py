from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime
from random import randint
import random

f = Faker(locale='en_US')

def seed_product_images():
    allImages = []

    for i in range(1, 61)
