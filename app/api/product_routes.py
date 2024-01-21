from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Product

product_routes = Blueprint("products",__name__)

#get all products
@product_routes.route('/all')
def get_all_products():
    # we want all products regardless of category but maybe sort them based on category?
    products = Product.query.all()
    list_dict_products = [product.to_dict() for product in products]
    print(list_dict_products)
    return jsonify({"products":list_dict_products})

#get product description
@product_routes.route('/<int:id>')
def get_product_details(id):
    product = Product.query.get(id)
    if product is None:
        return {"message": "Product doesn't exist"}, 404
    return {"product":product.to_dict()}

#get all products of the current user
@product_routes.route('/current', methods=['GET'])
@login_required
def get_user_products():
    user_products = Product.query.filter_by(sellerId=current_user.id).all()
    return {"products": [product.to_dict() for product in user_products]}

#delete a specific product
@login_required
@product_routes.route('/<int:id>', methods=['DELETE'])
def delete_product(id):

    product = Product.query.get(id)

    if product is None:
        return {'message': "Product doesn't exist"}, 404

    if current_user.id != product.sellerId:
        return {'message': "You do not have permission to delete this product"}, 403

    db.session.delete(product)
    db.session.commit()

    return {'message': 'Product deleted successfully'}, 200
