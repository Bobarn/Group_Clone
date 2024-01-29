// import { useState } from 'react';
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReviewComponent"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetOneReview } from "../../redux/reviews";
import ReviewModal from "./ReviewModal";
import './ReviewComponent.css'

const ReviewsComponent = ({ reviews }) => {


  // const [reviewedCheck, setReviewedCheck] = useState(false);

  const user = useSelector((state) => state.session.user)

  const { productId } = useParams();

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(thunkGetOneReview(productId));
    };

    fetchData();
  }, [dispatch, productId]);

  // let reviewedCheck;

  const reviewData = Object.values(reviews)
  // Object.values(reviews).forEach((review) => {
  //   if (user) {

  //     if (review.user.id === user.id) {
  //       reviewedCheck = true

  //     } else {
  //       reviewedCheck = false
  //     }
  //   }
  // })
  const reviewedCheck = reviewData.some(obj => obj?.user?.id === user?.id)

  if (!reviews) return null;

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
    <>
      {(!reviewedCheck && user) && <div className='postReview'>
        {<OpenModalButton
          modalComponent={
            <ReviewModal />
          }
          buttonText={"Post A Review"}
        />}
      </div>}
      {reviewData.map((review) => {
        return (
          <>
          <div className="prod-review-box"  >
            <div className="review-text-container" >
          <p>  {review?.review_text}</p>
            <p className="name-date-review" >
              {" "}
               {review && review?.user.first_name} {review && review?.user.last_name}

              {" "}
               {months[new Date(review?.created_at).getMonth()]} {new Date(review?.created_at).getDate()},{" "}
              {new Date(review?.created_at).getFullYear()}{" "}
            </p>
            </div>
            <div className="edit-delete-btns"  >
              {user && user.id === review.user?.id && <OpenModalButton
                onButtonClick={() => localStorage.setItem('selectedReviewId', review.id)}
                modalComponent={
                  <EditReview />
                }
                buttonText={"EDIT"}
              />}
              {user && user.id === review.user?.id && <OpenModalButton
                modalComponent={
                  <DeleteReview reviewId={review.id} />
                }
                buttonText={"DELETE"}
              />}
            </div>
            <div key={review?.id}>
            <div className="star-ratings-container">

              Rating
              <label>
                <br />
                {review && [...Array(5)].map((star, index) => {
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
              Item Quality
              <br />
              <label>
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={
                        index <= review?.item_qual ? "star-on" : "star-off"
                      }
                    >
                      <i className="fa-solid fa-star"></i>
                    </button>
                  );
                })}
                {review?.item_qual?.toFixed(1)}
              </label>
            </div>

            <div>
              Shipping
              <label>
                <br />
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
                <br />
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
            </div>
            </div>

            {/* <p> RATING: {review?.star_rating.toFixed(1)}</p> */}

          </>
        );

      }).reverse()}

    </>
  );
};

export default ReviewsComponent;
