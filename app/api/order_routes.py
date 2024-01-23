from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, OrderItem, Order
from app.forms import OrderItemForm
from sqlalchemy import desc

order_routes = Blueprint("orders", __name__)

@order_routes.route('/')
@login_required
def get_orders():
    orders = Order.query.filter_by(buyer_id=current_user.id).all()

    list_orders = [order.to_dict() for order in orders]

    return {"Orders": list_orders}

@order_routes.route('/new', methods=['POST'])
@login_required
def create_order():
    newOrder = Order(buyer_id=current_user.id)

    db.session.add(newOrder)
    db.session.commit()
    return {"Order": newOrder.to_dict()}

@order_routes.route('/item/<int:id>', methods=['POST'])
@login_required
def add_to_order(id):
    form = OrderItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        order = Order.query.get(data["order_id"])
        newItem = OrderItem(order_id=data["order_id"], product_id=id, quantity=data["quantity"])
        order.order_items.append(newItem)
        db.session.add(newItem)
        db.session.commit()
        return { "Order": order.to_dict()}
    else:
        return {"errors": form.errors}
