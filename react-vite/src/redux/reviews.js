const GET_ALL_REVIEWS = "reviews/getAllReviews";
const CREATE_REVIEW = "reviews/makeReview";
const DELETE_REVIEW = "reviews/deleteReview";
const UPDATE_REVIEW = "reviews/updateReview";
const GET_ONE_REVIEW = "reviews/getOneReview"
const POST_REVIEW = 'reviews/postReview'
// const UPDATE_SELECTED_REVIEW = 'reviews/updateSelectedReview'

const getAllReviews = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};
const getOneReview = (review) => {
  return {
    type: GET_ONE_REVIEW,
    review,
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
export const postReview = (review) => {
  return {
    type: POST_REVIEW,
    review,
  };
};



export const thunkGetAllReviews = () => async (dispatch) => {
  try {
    const response = await fetch("/api/reviews/all");
    // console.log("thunkgetallreviews", await response.json())
    // console.log(response, "!!!!!!!!!!!!!!!!!!RESPONSE HERE!!!!!!!!!!!!!!!!!!!!!!")
    if (response.ok) {
      const reviews = await response.json();
      // console.log("all reviews", reviews)
      dispatch(getAllReviews(reviews));
    }
  if (response.ok) {
    let reviews = await response.json();

    dispatch(getAllReviews(reviews));

    return reviews;
  }
  }
  catch (e) {
    console.error("error in thunk", e)
  }

};
export const thunkGetOneReview = (productId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/reviews/${productId}`);

    // console.log(productId, "THIS IS PRODUCTID!~!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    if (response.ok) {
      const review = await response.json();
      // console.log(review, "FOR BRANDON!!!!!!!")
      dispatch(getOneReview(review));

      return review;
    }
    else {
      throw new Error("Error in thunk")
    }
  }
  catch (e) {
    console.error("error in thunk", e)
  }

};

// export const thunkGetUserReviews = (userId) => async (dispatch) => {

//   const response = await fetch(`/api/reviews/${userId}`);

//   const reviews  = await response.json();
//   console.log(reviews, "LOOK HERE!!!!!!!!!")
//   dispatch(getAllReviews(reviews));
//   return reviews
// }


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
    // const message = await response.json();
    // console.log(message , '@@@@@@@@@@@@@@@@@@@@@@@')
    dispatch(deleteReview(reviewId));

    // return message;
  } else {
    const error = await response.json();
    return error;
  }
};

// export const thunkUpdateReview = (reviewId, review) => async (dispatch) => {
  export const thunkUpdateReview = (review, reviewId) => async (dispatch) => {


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
      let reviews = action.reviews;
      let newReviews = {};

      reviews.map((review) => {
        newReviews[review.id] = review;
      })
      return { ...state, ...newReviews };
    }
    case GET_ONE_REVIEW: {
      let reviews = action.review;
      let newReviews = {};

      reviews.map((review) => {
          newReviews[review.id] = review;
      })
      return {...newReviews };
    }

    case CREATE_REVIEW: {
      // const review = action.review.Review;
      // const newState = { ...state };
      // newState[review.id] = review;
      // return newState;
      return {...state, [action.review.id]:action.review}
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];

      return newState;
    }
    case UPDATE_REVIEW: {
      // const review = action.review;
      // const newState = { ...state };
      // newState[review.id] = review;
      // return newState;
      return {...state, [action.review.id]:action.review}
    }
    case POST_REVIEW: {
      const review = action.review;
      const newState = { ...state };
      newState[review.id] = review;
      return newState;
    }
    default:
      return state;
  }
}

export default reviewReducer;
