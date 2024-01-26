import { useEffect } from "react";
import { thunkGetAllReviews } from "../../redux/reviews";
// import { thunkGetOneReview } from "../../redux/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// import { thunkGetAllProducts } from "../../redux/product";

// const useProductsSelector = () => useSelector((store) => store.products);
const useReviewsSelector = () => useSelector((store) => store.reviews);

const ReviewComponent = () => {
  const dispatch = useDispatch();

  const { productId } = useParams();

  //   const products = useProductsSelector();
  const getReview = useReviewsSelector();

  // const reviews = useSelector(state => Object.values(state?.reviews))
  //   const reviews = useSelector((state) => state.reviews);

  //   const array = Object.values(reviews);

  //   useEffect(() => {
  //     dispatch(thunkGetOneReview(productId));
  //   }, [dispatch, productId]);

  useEffect(() => {
    dispatch(thunkGetAllReviews());
  }, []);

  // useEffect(() => {

  //    dispatch(thunkGetAllProducts());

  //  }, []);

  //  const product = products[productId];
  const review = getReview[productId];
  //   const product = products[productId];

  const date = new Date(review?.created_at);

  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  return (
    <div className="review-tile">
      <h1> REVIEW </h1>

      <div>
        RATING:
        <label>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={
                  index <= review?.star_rating ? "star-on" : "star-off"
                }
              >
                <i className="fa-solid fa-star"></i>
              </button>
            );
          })}
        </label>
      </div>
      <div>
        ITEM QUALITY:
        <label>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= review?.item_qual ? "star-on" : "star-off"}
              >
                <i className="fa-solid fa-star"></i>
              </button>
            );
          })}
          {review?.item_qual?.toFixed(1)}
        </label>
      </div>

      <div>
        SHIPPING:
        <label>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={
                  index <= review?.shipping_qual ? "star-on" : "star-off"
                }
              >
                <i className="fa-solid fa-star"></i>
              </button>
            );
          })}
          {review?.shipping_qual?.toFixed(1)}
        </label>
      </div>

      <div>
        CUSTOMER SERVICE:
        <label>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={
                  index <= review?.service_qual ? "star-on" : "star-off"
                }
              >
                <i className="fa-solid fa-star"></i>
              </button>
            );
          })}
          {review?.service_qual?.toFixed(1)}
        </label>
      </div>

      {/* <p> RATING: {review?.star_rating.toFixed(1)}</p> */}
      <p> REVIEW: {review?.review_text}</p>
      <p>
        {" "}
        USER: {review?.user.first_name} {review?.user.last_name}
      </p>
      {/* <p> DATE: {date.toDateString()} </p> */}
      <p>
        {" "}
        DATE: {months[date.getMonth()]} {date.getDay()}, {date.getFullYear()}{" "}
      </p>
      {/* <div >
        {Intl.DateTimeFormat("en", { month: "long" }).format(
          new Date(review?.created_at.split("-")[1])
        )}{" "}

        {review?.created_at.split("-")[0]}
      </div> */}
      {/* // <p> ITEM QUALITY: {review?.item_qual.toFixed(1)}</p> */}
      {/* // <p> SHIPPING: {review?.shipping_qual.toFixed(1)}</p>
      // <p> CUSTOMER SERVICE: {review?.service_qual.toFixed(1)}</p> */}

      {/* {array.map((review) => {
        return <div key={review}>Star: {review.star_rating}</div>;
      })} */}
      {/* {array.map((review) => {
        return <div key={review}> REVIEW: {review.review_text}</div>;
      })}

      {array.map((review) => {
        return <div key={review}> Item quality: {review.item_qual}</div>;
      })}
      {array.map((review) => {
        return <div key={review}> Shipping: {review.shipping_qual}</div>;
      })}
      {array.map((review) => {
        return <div key={review}> Customer service: {review.service_qual}</div>;
      })} */}

      {/* <pre>{JSON.stringify(products,null,2)}</pre> */}
      {/* <pre>{JSON.stringify(review, null, 2)}</pre> */}
    </div>
  );
};

export default ReviewComponent;
