// import { useState } from 'react';
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReviewComponent"
import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";


const ReviewsComponent = ({ reviews }) => {

// const useReviewsSelector = () => useSelector((store) => store.reviews);

  // const [reviewId, setReviewId] = useState();
  // const { productId } = useParams();
  // const getReview = useReviewsSelector();


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
      <h1> hello world</h1>
      {reviews.map((review) => {
        return (
          <>
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
            <p>
              {" "}
              DATE: {months[new Date(review?.created_at).getMonth()]} {new Date(review?.created_at).getDay()},{" "}
              {new Date(review?.created_at).getFullYear()}{" "}
            </p>

            <div style={{display: "flex", flexDirection: "row", gap: "5px"}} >
            <OpenModalButton
                  onButtonClick={() => localStorage.setItem('selectedReviewId', review.id)}
                  modalComponent={
                   <EditReview />
                  }
                  buttonText={"EDIT"}
                />
                <OpenModalButton
                  modalComponent={
                    <DeleteReview reviewId={review.id}/>
                  }
                  buttonText={"DELETE"}
                />
              </div>

          </>
        );

      })}

    </>
  );
};

export default ReviewsComponent;
