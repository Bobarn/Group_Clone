from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, FavoritedItem

favorited_routes = Blueprint('favorites', __name__)

@favorited_routes.route('/', methods=['GET'])
@login_required
def get_saved_products():

    saved_products = FavoritedItem.query.filter_by(userId=current_user.id).all()
    saved_product_data = [saved_product.product.to_dict() for saved_product in saved_products]
    return jsonify(saved_product_data)
    # return {"favorites":saved_product_data}

@favorited_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def add_saved_product(product_id):
    existing_favorite = FavoritedItem.query.filter_by(userId=current_user.id, productId=product_id).first()

    if not existing_favorite:
        new_favorite = FavoritedItem(userId=current_user.id, productId=product_id)
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify(new_favorite.product.to_dict())

    return jsonify(message='Product already favorited')

@favorited_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def remove_saved_product(product_id):
    existing_favorite = FavoritedItem.query.filter_by(userId=current_user.id, productId=product_id).first()

    if existing_favorite:
        db.session.delete(existing_favorite)
        db.session.commit()
        return jsonify({'message': 'Product unfavorited successfully'})

    return jsonify({'message': 'Product not found in favorites'})
