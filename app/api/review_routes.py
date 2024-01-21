from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Review

review_routes = Blueprint('reviews'/__name__)

#  GET ALL REVIEWS - not sure which one is better so i'll do both
@review_routes.route('/',methods=['GET'])
def get_all_reviews():
    pass
