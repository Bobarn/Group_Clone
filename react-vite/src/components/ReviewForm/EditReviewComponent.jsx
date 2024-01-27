import "./ReviewForm.css";

import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { thunkGetOneReview, thunkUpdateReview } from "../../redux/reviews";
import { thunkGetAllProducts } from "../../redux/product";

const useProductsSelector = () => useSelector((store) => store.products);
const useReviewsSelector = () => useSelector((store) => store.reviews);
const useUserSelector = () => useSelector((store) => store.session);

const EditReviewModal = () => {
  const reviewId = localStorage.getItem("selectedReviewId");

  const dispatch = useDispatch();
  const { productId } = useParams();

  const products = useProductsSelector();
  const getReviews = useReviewsSelector();
  const sessions = useUserSelector();

  const { closeModal } = useModal();

  const reviewData = getReviews[reviewId];

  const [review, setReview] = useState(reviewData?.review_text);
  const [rating, setRating] = useState(reviewData?.star_rating);
  const [itemQuality, setItemQuality] = useState(reviewData?.item_qual);
  const [shipping, setShipping] = useState(reviewData?.shipping_qual);
  const [customerService, setCustomerService] = useState(
    reviewData?.service_qual
  );
  const [enableSubmit, setEnableSubmit] = useState(false);

  const cancel = () => {
    closeModal();
  };

  useEffect(() => {
    dispatch(thunkGetAllProducts());
    dispatch(thunkGetOneReview(productId));
  }, [dispatch, productId]);

  const user = sessions["user"];
  const product = products[productId];

  const canSubmit = useCallback(() => {
    if (review.length < 2 && rating === 0) {
      return false;
    }
    return true;
  }, [review, rating]);

  useEffect(() => {
    setEnableSubmit(canSubmit());
  }, [review, canSubmit]);

  const onReviewChange = (e) => {
    setReview(e.target.value);
    setEnableSubmit(canSubmit());
  };

  const onStarChange = (value, setStarState) => {
    setStarState(value);
    setEnableSubmit(canSubmit());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit()) {
      editReview(reviewId);
    }
  };

  const editReview = async (reviewId) => {
    closeModal();
    dispatch(
      thunkUpdateReview(
        {
          reviewText: review,
          starRating: rating,
          itemQual: itemQuality,
          shippingQual: shipping,
          serviceQual: customerService,
        },
        reviewId
      )
    );
    await dispatch(thunkGetOneReview(product.id));
<<<<<<< HEAD
    await dispatch(thunkGetAllProducts())
=======
>>>>>>> cd9050790115505faea29ebe251551d9fb6a00ec
  };

  return (
    <div className="review_form">
      <img src={product?.preview_image} height="350px" alt="" />
      <caption>{product?.name}</caption>
      <p>Reviews: {product?.reviews}</p>
      <p>Seller: {product?.seller?.username}</p>



      <h2 className="edith2">Help others by sharing your feedback</h2>
      <h3 className="edith2">
        What do you think about this? Did it ship on time? Describe your
        experience with this shop.
      </h3>
      <h2 className="edith2"> My review </h2>
      <form onSubmit={handleSubmit}>

      <div className=" star-rating">


      <div className="ratings">
        <label>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= rating ? "star-on" : "star-off"}
                onClick={() => onStarChange(index, setRating)}
              >
                <i className="fa-solid fa-star"></i>
              </button>
            );
          })}
        </label>
      </div>
      {review.length >= 200 && (
        <p className="error">
          {" "}
          You have reached the Max Length: 200 characters{" "}
        </p>
      )}


        <div className="ratings">
          <h2 className="edith2">Item Quality</h2>
          <label>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= itemQuality ? "star-on" : "star-off"}
                  onClick={() => onStarChange(index, setItemQuality)}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
              );
            })}
          </label>
        </div>

        <div className="ratings">
          <h2 className="edith2">Shipping</h2>
          <label>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= shipping ? "star-on" : "star-off"}
                  onClick={() => onStarChange(index, setShipping)}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
              );
            })}
          </label>
        </div>

        <div className="ratings">
          <h2 className="edith2">Customer Service</h2>
          <label>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= customerService ? "star-on" : "star-off"}
                  onClick={() => onStarChange(index, setCustomerService)}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
              );
            })}
          </label>
        </div>







      </div>


        <div className="review-text">
          <textarea
            className="w-100"
            type="textArea"
            value={review}
            placeholder="Leave your review here..."
            onChange={onReviewChange}
            maxLength={200}
            required
          />
        </div>
        <p>
          {" "}
          Reviewed by {user?.first_name} {user?.last_name}
        </p>
        <p>Your review and profile information will be publicly displayed</p>
        <button type="submit" disabled={!enableSubmit || rating === 0}>
          Post Your Review
        </button>
      </form>

      <button className="cancel-button" onClick={cancel}>
        CANCEL
      </button>
    </div>
  );
};

export default EditReviewModal;