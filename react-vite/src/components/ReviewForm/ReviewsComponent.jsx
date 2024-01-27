// import { useState } from 'react';
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReviewComponent"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetOneReview } from "../../redux/reviews";
import ReviewModal from "./ReviewModal";
<<<<<<< HEAD

=======
import './ReviewsComponent.css'
>>>>>>> cd9050790115505faea29ebe251551d9fb6a00ec

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
  console.log(reviewData, "LOOK OVER HERE FOR REVIEWDATA!!")

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

<<<<<<< HEAD
  console.log("reveiewssssssssssssssssssssssssssssssss", reviews)
=======

>>>>>>> cd9050790115505faea29ebe251551d9fb6a00ec

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
<<<<<<< HEAD
          <>
            <div key={review?.id}>
              RATING:
              <label>
=======
          <div className="prod-review-box" key={review.id}>
          <div className="review-text-container">
            <p>REVIEW: {review?.review_text}</p>
            <p>USER: {review && review?.user.first_name} {review && review?.user.last_name}</p>
            <p>DATE: {months[new Date(review?.created_at).getMonth()]} {new Date(review?.created_at).getDay()}, {new Date(review?.created_at).getFullYear()}</p>
          </div>
          <div className="edit-delete-btns">
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
          <div className="star-ratings-container">
            <div className="star-rating-section">
              RATING:
              <label>
                <br />
>>>>>>> cd9050790115505faea29ebe251551d9fb6a00ec
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
            <div className="star-rating-section">
              ITEM QUALITY:
              <label>
                <br />
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
            <div className="star-rating-section">
              SHIPPING:
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
            <div className="star-rating-section">
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

<<<<<<< HEAD
            {/* <p> RATING: {review?.star_rating.toFixed(1)}</p> */}
            <p> REVIEW: {review?.review_text}</p>
            <p>
              {" "}
              USER: {review && review?.user.first_name} {review && review?.user.last_name}
            </p>
            <p>
              {" "}
              DATE: {months[new Date(review?.created_at).getMonth()]} {new Date(review?.created_at).getDay()},{" "}
              {new Date(review?.created_at).getFullYear()}{" "}
            </p>

            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }} >
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

          </>
        );

      }).reverse()}

=======
          </div>
        );
      }).reverse()}
>>>>>>> cd9050790115505faea29ebe251551d9fb6a00ec
    </>
  );
};

export default ReviewsComponent;