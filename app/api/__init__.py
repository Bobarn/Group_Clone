from flask import Flask, Blueprint
from .auth_routes import auth_routes
from .user_routes import user_routes
from .product_routes import product_routes

bp = Blueprint('api', __name__, url_prefix='/api')

#blueprint routes
bp.register_blueprint(auth_routes, url_prefix='/auth')
bp.register_blueprint(user_routes, url_prefix='/users')
bp.register_blueprint(product_routes, url_prefix='/products')
