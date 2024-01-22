const GET_ALL_PRODUCTS = "products/getAllProducts";

const getAllProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products,
  };
};

export const thunkGetAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products/all");

  if (response.ok) {
    const products = await response.json();

    dispatch(getAllProducts(products));

    return products;
  } else {
    return { errors: "Could not get all products" };
  }
};

function productReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      products = action.products.products;
      newProducts = {};

      products.map((product) => {
        newProducts[product.id] = product;
      });

      return { ...state, ...newProducts };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default productReducer;
