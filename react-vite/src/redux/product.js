const GET_ALL_PRODUCTS = "products/getAllProducts";
const GET_ALL_PRODUCTS_IMAGES = "product/images/getAll";
const GET_ALL_PRODUCTS_CAT = "product/getAllCat";
const GET_ALL_PRODUCTS_BY_CATEGORY = "products/getAllProductsByCategory"
const CREATE_PRODUCT = "products/makeProduct";
const DELETE_PRODUCT = "products/deleteProduct";
const UPDATE_PRODUCT = "products/updateProduct";
const CLEAR_STATE = "products/clearState"

const getAllProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products,
  };
};

const getAllProductsByCategory = (products) => {
  return {
    type: GET_ALL_PRODUCTS_BY_CATEGORY,
    products
  }
}

const getAllProductsWImages = (products) => {
  return {
    type: GET_ALL_PRODUCTS_IMAGES,
    products,
  };
};

const getAllCategories = (products) => {
  return {
    type: GET_ALL_PRODUCTS_CAT,
    products,
  };
};

const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};

const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

export const clearState = () => {

  return {
    type:CLEAR_STATE
  }
}


export const thunkGetAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products/all");

  if (response.ok) {
    const products = await response.json();
    // console.log(products)

    dispatch(getAllProducts(products));

    return products;
  } else {
    return { errors: "Could not get all products" };
  }
};

// ALTERNATIVE THUNK TO PULL IMAGES FOR LANDING
export const thunkGetAllProductsWImages = () => async (dispatch) => {
  const response = await fetch("/api/products/images");

  if (response.ok) {
    const products = await response.json();

    dispatch(getAllProductsWImages(products));

    return products;
  } else {
    return { errors: "Could not get all products" };
  }
};



//To create new area in store containing all products of each category
export const thunkGetAllProductsByCategory = (category) => async (dispatch) => {
  const response = await fetch(`/api/products/category/${category}`)

  if(response.ok) {
    const products = await response.json();
    products.Category = category;

    dispatch(getAllProductsByCategory(products));

    return products;
  } else {
    const errors = await response.json()

    return errors;
  }
}

export const thunkGetAllByCat = (category) => async (dispatch) => {

  const response = await fetch(`/api/products/category/${category}`);

  if (response.ok) {
    const products = await response.json();

    dispatch(getAllCategories(products));

    return products;
  } else {
    return { errors: "Could not get products by category" };
  }
};

export const thunkCreateProduct =
  (productFormData, image) => async (dispatch) => {
    const response = await fetch("/api/products/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productFormData),
    });
    // console.log(images)

    if (response.ok) {
      const newProduct = await response.json();

      // for (let image in images) {
      // console.log(image)
      const imageResponse = await fetch(
        `/api/products/${newProduct.product.id}/images/new`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: image,
          }),
        }
      );
      const url = await imageResponse.json();

      newProduct.product.preview_image = url.product_image;
      // }
      // ! Consider attaching images or revisit to see if we need/should return images
      dispatch(createProduct(newProduct));

      return newProduct;
    } else {
      const errors = await response.json();
      return errors;
    }
  };

export const thunkDeleteProduct = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  // console.log(response)
  await dispatch(thunkGetAllProducts())

  if (response.ok) {
    const message = await response.json();
    dispatch(deleteProduct(productId));

    return message;
  } else {
    const error = await response.json();
    // console.log(error, "Here is the error")

    return error;
  }
};

export const thunkUpdateProduct = (productId, product) => async (dispatch) => {
  // console.log(product)
  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (response.ok) {
    const updatedProduct = await response.json();

    dispatch(updateProduct(updatedProduct));

    return updatedProduct;
  } else {
    const errors = await response.json();
    // console.log(errors)
    return errors;
  }
};

function productReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS: {
      let products = action.products.products;
      // console.log(products)
      let newProducts = {};

      products.map((product) => {
        newProducts[product.id] = product;
      });

      return { ...state, ...newProducts };
    }
    case GET_ALL_PRODUCTS_IMAGES: {
      let products = action.products.products;
      let newProducts = {};

      products.map((product) => {
        newProducts[product.id] = product;
      });

      return { ...state, ...newProducts };
    }
    case GET_ALL_PRODUCTS_CAT: {
      let products = action.products.products;

      let newProducts = {};

      products.map((product) => {
        newProducts[product.id] = product;
      });

      return { ...state, ...newProducts };
    }
    case GET_ALL_PRODUCTS_BY_CATEGORY: {
      let products = action.products.products;
      let category = action.products.Category;

      const newState = {...state};
      newState[category] = [...products]

      return newState;

    }
    case CREATE_PRODUCT: {
      const product = action.product.product;
      const newState = { ...state };
      newState[product.id] = product;
      return newState;
    }
    case DELETE_PRODUCT: {
      const newState = { ...state };
      delete newState[action.productId];

      return newState;
    }
    case UPDATE_PRODUCT: {
      const product = action.product.product;
      const newState = { ...state };
      newState[product.id] = product;
      return newState;
    }
    case CLEAR_STATE:{
      return {}
    }
    default:
      return state;
  }
}

export default productReducer;
