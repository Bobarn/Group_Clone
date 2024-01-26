import "./ReviewForm.css";

import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { thunkGetOneReview, thunkUpdateReview } from "../../redux/reviews";
import { thunkGetAllProducts} from "../../redux/product";

const useProductsSelector = () => useSelector((store) => store.products);
const useReviewsSelector = () => useSelector((store) => store.reviews);
const useUserSelector = () => useSelector((store) => store.session)

const EditReviewModal = () => {

  const reviewId = localStorage.getItem("selectedReviewId")

  const dispatch = useDispatch();
  const { productId } = useParams();

  const products = useProductsSelector();
  const getReviews = useReviewsSelector();
  const sessions = useUserSelector();

  // const { closeModal, setModalContent } = useModal();
  const { closeModal } = useModal();

  const reviewData = getReviews[reviewId]

  const [review, setReview] = useState(reviewData?.review_text);
  const [rating, setRating] = useState(reviewData?.star_rating);
  const [enableSubmit, setEnableSubmit] = useState(false);

   const cancel = () => {
      closeModal();
  }

  console.log(reviewData, "reviewData");

  useEffect(() => {
    dispatch(thunkGetAllProducts());
    // setModalContent(<ReviewModal></ReviewModal>);
    dispatch(thunkGetOneReview(productId))
  }, []);

  // const product = products[productId];
  // const reviews = getReview[productId];

  console.log(getReviews, "reviews")

  const user = sessions["user"];
  const product = products[productId];

  const canSubmit = useCallback(() => {
    if(review.length < 2 && rating === 0) {
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

  const onStarChange = (value) => {
    setRating(value);
    setEnableSubmit(canSubmit());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit()) {
      editReview(reviewId);
    }
  };

  const editReview = async (reviewId) => {
    closeModal();
      dispatch(thunkUpdateReview({
        reviewText: review,
        starRating: rating,
      }, reviewId));

  };

  return (
   <div className="review_form">
      <img src={product?.preview_image} height="350px" alt="" />
      <caption>{product?.name}</caption>
      <p>Reviews: {product?.reviews}</p>
      <p>Seller: {product?.seller?.username}</p>
      <h2> My review </h2>
      <div className="star-rating">
        <label>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= rating ? "star-on" : "star-off"}
                onClick={() => onStarChange(index)}
              >
                <i className="fa-solid fa-star"></i>
              </button>
            );
          })}
        </label>
        {/* <div>Rating</div> */}
      </div>

      <h2>Help others by sharing your feedback</h2>
      <h3>
        What do you think about this? Did it ship on time? Describe your
        experience with this shop.
      </h3>
      {review.length >= 200 && (
        <p className="error">
          {" "}
          You have reached the Max Length: 200 character{" "}
        </p>
      )}

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
        <p> Reviewed by {user?.first_name} {user?.last_name}</p>
        <p></p>
        <p> Your review and profile information will be publicly displayed </p>

        <button
          type="submit"
          disabled={!enableSubmit || rating === 0}
          // className={
          //   enableSubmit ? "x" : "x"
          // }
        >
          Post Your Review
        </button>
      </form>
      {/* <pre>{JSON.stringify(products,null,2)}</pre> */}
      <button className="cancel-button" onClick={cancel}>
        CANCEL
      </button>
    </div>
  );
}

export default EditReviewModal;
