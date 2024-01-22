from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Product
from app.forms import ProductForm
from sqlalchemy import desc

product_routes = Blueprint("products",__name__)

#get all products
@product_routes.route('/all')
def get_all_products():
    # we want all products regardless of category but maybe sort them based on category?
    # or we just display based on id
    page = request.args.get('page')
    if page == None:
        page = 1
    page = (int(page) - 1) * 10
    products = Product.query.order_by(desc(Product.created_at)).limit(10).offset(page).all()
    if not products:
        return {"message": "That page does not exist"}
    list_dict_products = [product.to_dict() for product in products]
    return {"products":list_dict_products}

#get all products by category
@product_routes.route('/category/<cat>')
def get_products_by_category(cat):
    print(cat)
    if cat not in ['Jewelry', 'Clothes', 'Art', 'Art Supplies', 'Electronics', 'Pet Supplies']:
        return {"message": "Category doesn't exist"}, 404
    page = request.args.get('page')
    if page == None:
        page = 1
    page = (int(page) - 1) * 5
    products = Product.query.filter_by(category=cat).limit(5).offset(page).all()
    if not products:
        return {"message": "That page does not exist"}
    return {"products": [product.to_dict() for product in products]}

#get a product's description
@product_routes.route('/<int:id>')
def get_product_details(id):
    product = Product.query.get(id)
    if product is None:
        return {"message": "Product doesn't exist"}, 404
    return {"product":product.to_dict()}

#get all products of the current user
@product_routes.route('/current', methods=['GET'])
@login_required
def get_current_user_products():
    page = request.args.get('page')
    if page == None:
        page = 1
    page = (int(page) - 1) * 5
    products = Product.query.filter_by(sellerId=current_user.id).limit(5).offset(page).all()
    if not products:
        return {"message": "That page does not exist"}
    return {"products": [product.to_dict() for product in products]}


@product_routes.route('/new', methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print(data)

        newProduct = Product(
            sellerId=current_user.id,
            name=data["name"],
            description=data["description"],
            price=data["price"],
            category=data["category"],
            shipping_time=data["shipping_time"],
            return_policy=data["return_policy"],
            free_shipping=data["free_shipping"]
        )

        db.session.add(newProduct)
        db.session.commit()

        return {"product": newProduct.to_dict()}
    else:
        return {"errors": form.errors}, 400

#delete a specific product
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_specific_product(id):

    product = Product.query.get(id)

    if product is None:
        return {'message': "Product doesn't exist"}, 404

    if current_user.id != product.sellerId:
        return {'message': "You do not have permission to delete this product"}, 403

    db.session.delete(product)
    db.session.commit()

    return {'message': 'Product deleted successfully'}, 200
