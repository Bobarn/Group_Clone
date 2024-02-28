import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postReview, thunkGetOneReview } from "../../redux/reviews";
import { thunkGetAllProducts } from "../../redux/product";
const useProductsSelector = () => useSelector((store) => store.products);
const useUserSelector = () => useSelector((store) => store.session);
import './ReviewForm.css'
// const useReviewsSelector = () => useSelector((store) => store.reviews);




function ReviewModal() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const products = useProductsSelector();
  const sessions = useUserSelector();

  const { closeModal, setModalContent } = useModal();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [itemQuality, setItemQuality] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [customerService, setCustomerService] = useState(0);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const cancel = () => {
    closeModal();
  };


  useEffect(() => {
    setModalContent(<ReviewModal></ReviewModal>);
    dispatch(thunkGetAllProducts());
  }, []);

  const product = products[productId];
  const user = sessions?.user;

  const canSubmit = useCallback(() => {
    if (review.length < 2) {
      return false;
    }
    if (rating < 0 || itemQuality < 0 || shipping < 0 || customerService < 0) {
      return false;
    }
    return true;
  }, [review, rating, itemQuality, shipping, customerService]);

  useEffect(() => {
    setEnableSubmit(canSubmit());
  }, [review, rating, itemQuality, shipping, customerService, canSubmit]);

  if (!products) return null
  if (!sessions) return null
  const onReviewChange = (e) => {
    setReview(e.target.value);
    setEnableSubmit(canSubmit());
  };

  const onStarChange = (value, setStarState) => {
    setStarState(value);
    setEnableSubmit(canSubmit());
  };

  const renderStars = (value, setStarState, title) => {
    return (
      <div className="ratings">
        <h2>{title}</h2>
        <label>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= value ? "star-on" : "star-off"}
                onClick={() => onStarChange(index, setStarState)}
              >
                <i className="fa-solid fa-star"></i>
              </button>
            );
          })}
        </label>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit()) {
      addReview(productId);
    }
    await dispatch(thunkGetOneReview(productId));
    closeModal()
  };

  const addReview = async (id) => {
    closeModal();

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewText: review,
          starRating: rating,
          itemQual: itemQuality,
          shippingQual: shipping,
          serviceQual: customerService,
        }),
      });

      if (response.ok) {

        await response.json().then((data) => {
          dispatch(postReview(data));
        });
        dispatch(thunkGetAllProducts())
        dispatch(thunkGetOneReview(productId));
      } else {
        console.error("Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="review-form-post">
      <div id='review-product-info'>
        <img className="review-image" src={product?.preview_image} height="350px" alt="" />
        <div id="review-product-details">
          <caption className="image-title" >{product?.name}</caption>
          <div>Seller: {product?.seller?.username}</div>
        </div>
      </div>
      <h2 className='edith2'>My Review </h2>
      <div className="star-rating">
      {renderStars(rating, setRating, "Overall Rating")}
      {renderStars(itemQuality, setItemQuality, "Item Quality")}
      {renderStars(shipping, setShipping, "Shipping")}
      {renderStars(customerService, setCustomerService, "Customer Service")}
      </div>

      <form onSubmit={handleSubmit}>
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
        <div className="author" > Reviewed by {user?.first_name} {user?.last_name}</div>
        <p className="disclaimer" >Your review and profile information will be publicly displayed</p>
        <button
        className="post-btn"
          type="submit"
          disabled={!enableSubmit || rating === 0}
        >
          Post Your Review
        </button>
      </form>
      <button className="cancel-button" onClick={cancel}>
        CANCEL
      </button>
    </div>
  );
}

export default ReviewModal;
