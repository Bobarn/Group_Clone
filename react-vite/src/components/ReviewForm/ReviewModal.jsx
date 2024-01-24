import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useCallback, useEffect, useState } from "react";
import "./ReviewForm.css";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { postReview } from "../../redux/reviews";
import { thunkGetAllProducts } from "../../redux/product";
// import { useNavigate } from "react-router-dom";

// selectors to quickly access values from redux store without duplicating selector logic everywhere\
/**
 *
 * @example
 * how to use the selector
 * function DialogCmp(){
 * //get the list of products
 *  const products = useProductsSelector()
 *
 * }
 * @returns {Record<string,product>}
 */
const useProductsSelector = () => useSelector((store) => store.products);
// const useReviewsSelector = () => useSelector((store) => store.reviews);
// const useProductsSelector =  ()=>useSelector((store) => store.products)
//
function ReviewModal() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const products = useProductsSelector();

  const { closeModal, setModalContent } = useModal();

  // const { visible, show, close } = useModal();
  // const navigate = useNavigate();

  const [review, setReview] = useState("");

  const [rating, setRating] = useState(0);

  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect(() => {
    setModalContent(<ReviewModal></ReviewModal>);

    dispatch(thunkGetAllProducts());

  }, []);

  const product = products[productId];


  const canSubmit = useCallback(() => {
    if (review.length < 2) {
      return false;
    }
    if (rating < 0) {
      return false;
    }
    return true;
  }, [review, rating]);

  useEffect(() => {
    setEnableSubmit(canSubmit());
  }, [review, canSubmit]);

  // if (!product){
  //   return <div>product with id :{productId} not found</div>
  // }

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
      addReview(productId);
    }
  };

  const addReview = async (id) => {

    // navigate(`/review/${id}`)
    closeModal();
    await fetch(`/api/reviews/${id}`, {
      method: "POST",
      // headers: { user: sessionUser },
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviewText: review,
        starRating: rating,
      }),
    }).then(async (response) => {

      dispatch(postReview(response));
    });
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

        <button
          type="submit"
          disabled={!enableSubmit || rating === 0}
          className={
            enableSubmit ? "x" : "x"
          }
        >
          Post Your Review
        </button>
      </form>
      {/* <pre>{JSON.stringify(products,null,2)}</pre> */}
    </div>
  );
}

export default ReviewModal;
