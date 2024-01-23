from flask import Blueprint, abort, request, jsonify
from flask_login import current_user, login_required
from datetime import datetime
from app.models import db, Review
from app.forms import ReviewForm


review_routes = Blueprint('reviews',__name__)

#  GET ALL REVIEWS - not sure which one is better so i'll do both
@review_routes.route('/all',methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    dict_reviews = [review.to_dict() for review in reviews]
    print("AAAAAAAAAAAAAAAAAAAAAAAAA" , dict_reviews)
    return jsonify(dict_reviews)



# GET SINGLE REVIEW
@review_routes.route('/<int:product_id>', methods=['GET'])
def get_review_product_id(product_id):

    reviews = Review.query.filter_by(productId=product_id).all()
    dict_reviews = [review.to_dict() for review in reviews]

    return jsonify(dict_reviews)




# POST A REVIEW
@review_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def post_review(product_id):

    user_id = current_user.id
    # user_id = 3
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            userId = user_id, #login form needs to be updated in order for this to work
            productId = product_id,
            reviewText = form.reviewText.data,
            starRating = form.starRating.data or None,
            itemQual = form.itemQual.data or None,
            shippingQual = form.shippingQual.data or None,
            serviceQual = form.serviceQual.data or None,
            created_at = datetime.now(),
            updated_at = datetime.now()
        )
        db.session.add(new_review)
        db.session.commit()

        return jsonify(new_review.to_dict())

    return "Missing Required Data"



# DELETE REVIEW
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required # - need to figure out login
def delete_review(id):
    curr_user = current_user.id
    # curr_user = 3 #******
    review = Review.query.get(id)
    if not review:
        return {"message": "Review does not exist"}, 404

    dict_review = review.to_dict()

    if curr_user != review.userId: # NEED TO FIGURE OUT LOGIN
        return {"message": "You cannot Delete this spot"}, 403

    db.session.delete(review)
    db.session.commit()

    return {"message": "Review deleted successfully"}, 204






# UPDATE A REVIEW
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    # curr_user = current_user.id
    review = Review.query.get(id)
    if not review:
        return {"message": "Review not found"}, 403
    dict_review = review.to_dict()
    # print("dict review!!!!!", dict_review.id)
    # print('#######', dict_review)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.reviewText = form.reviewText.data #or review.reviewText # THIS IS A MAYBE IN CASE WE WANT NO ERRORS
        review.starRating = form.starRating.data # or review.starRating # THIS IS A MAYBE IN CASE WE WANT NO ERRORS
        review.itemQual = form.itemQual.data or None
        review.shippingQual = form.shippingQual.data or None
        review.serviceQual = form.serviceQual.data or None


        db.session.commit()

        updated_review = Review.query.get(id)
        dict_updated_review = updated_review.to_dict()
        return jsonify(dict_updated_review)
    else:
        return {"message": "Missing Required Data"}, 404
