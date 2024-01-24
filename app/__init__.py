import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, login_required
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
#IMPORT PRODUCT ROUTES LIGHT
from .api.product_routes import product_routes
from .seeds import seed_commands
from .config import Config
from .models.product_images import ProductImage
from .forms.product_image_form import ImageForm
from .api.review_routes import review_routes


app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(review_routes, url_prefix ='/api/reviews')
app.register_blueprint(auth_routes, url_prefix='/api/auth')

#ADD PRODUCTS ROUTE AND REGISTURE IT INTO SERVER LIGHT
app.register_blueprint(product_routes, url_prefix='/api/products')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........

@app.route("/products/<int:id>/images",methods=['GET'])
def product_images(id):
    products = ProductImage.query.filter(productId=id)
    # print((products[0].images[0].url))
    return render_template("product_image.html", products=products)

@app.route("/products/<int:id>/images/new", methods=['POST'] )
@login_required

def post_product_images(id):
    form = ImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        url = form.url.data

        new_image = ProductImage(url=url, productId=int(id))

        db.session.add(new_image)
        db.session.commit()

        return {"product_image": url}
    # return render_template("new_image_form.html", form=form)
    return { "post_product_images": form.errors }



@app.route("/images/<int:id>", methods=['DELETE'])
@login_required

def delete_product_images(id):
    productImage = ProductImage.query.get(id)
    db.session.delete(productImage)
    db.session.commit()

    return {'id' : "Image deleted successfully!"}

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
