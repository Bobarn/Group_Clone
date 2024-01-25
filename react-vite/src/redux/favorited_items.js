const GET_ALL_FAVORITES = "favorites/getAllFavorites";
const CREATE_FAVORITE = "favorites/makeFavorite";
const DELETE_FAVORITE = "faavorites/deleteFavorite";

const getAllFavorites = (favorites) => {
  return {
    type: GET_ALL_FAVORITES,
    favorites,
  };
};

const createFavorite = (favorite) => {
  return {
    type: CREATE_FAVORITE,
    favorite,
  };
};

const deleteFavorite = (favoriteId) => {
  return {
    type: DELETE_FAVORITE,
    favoriteId,
  };
};

export const thunkGetAllFavorites = () => async (dispatch) => {
  const response = await fetch("/api/favorites/");
  console.log("im in thunk favorites", response)
  if (response.ok) {
    const favorites = await response.json();

    dispatch(getAllFavorites(favorites));

    return favorites;
  }
};

export const thunkCreateFavorite = (productId) => async (dispatch) => {
  const response = await fetch(`/api/favorites/${productId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId,
    }),
  });
  console.log(response)

  if (response.ok) {
    const newFavorite = await response.json();

    dispatch(createFavorite(newFavorite));

    return newFavorite;
  } else {
    const error = await response.json()
    console.log(error)
    return { Error: "Could not add to favorites" };
  }
};

export const thunkDeleteFavorite = (favoriteId) => async (dispatch) => {
  const response = await fetch(`/api/favorites/${favoriteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const message = await response.json();
    dispatch(deleteFavorite(favoriteId));

    return message;
  } else {
    const error = await response.json();

    return error;
  }
};

function favoritesReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_FAVORITES: {
      let favorites = action.favorites;
      let newFavorites = {};

      favorites.map((product) => {
        newFavorites[product.id] = product;
      });

      return { ...state, ...newFavorites };
    }
    case CREATE_FAVORITE: {
      const favorite = action.favorite;
      const newState = { ...state };
      newState[favorite.id] = favorite;
      return newState;
    }
    case DELETE_FAVORITE: {
      const newState = { ...state };
      delete newState[action.favoriteId];

      return newState;
    }
    default:
      return state;
  }
}

export default favoritesReducer;
