const GET_ALL_REVIEWS = "reviews/getAllReviews";
const CREATE_REVIEW = "reviews/makeReview";
const DELETE_REVIEW = "reviews/deleteReview";
const UPDATE_REVIEW = "reviews/updateReview";

const getAllReviews = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

const updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review,
  };
};

export const thunkGetAllReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews/all");

  if (response.ok) {
    const reviews = await response.json();

    dispatch(getAllReviews(reviews));

    return reviews;
  }
};

export const thunkCreateReview =
  (reviewDetails, productId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewDetails),
    });

    if (response.ok) {
      const newReview = await response.json();

      dispatch(createReview(newReview));

      return newReview;
    } else {
      return { Error: "Could not post review" };
    }
  };

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const message = await response.json();
    dispatch(deleteReview(reviewId));

    return message;
  } else {
    const error = await response.json();

    return error;
  }
};

export const thunkUpdateReview = (reviewId, review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const updatedReview = await response.json();

    dispatch(updateReview(updatedReview))

    return updatedReview;
  } else {
    const errors = await response.json();
    return errors;
  }
};

function reviewReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_REVIEWS: {
      let reviews = action.reviews.Reviews;
      let newReviews = {};

      reviews.map((review) => {
        newReviews[review.id] = review;
      });

      return { ...state, ...newReviews };
    }
    case CREATE_REVIEW: {
      const review = action.review.Review;
      const newState = { ...state };
      newState[review.id] = review;
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];

      return newState;
    }
    case UPDATE_REVIEW: {
      const review = action.review.updated_review;
      const newState = { ...state };
      newState[review.id] = review;
      return newState;
    }
    default:
      return state;
  }
}

export default reviewReducer;
