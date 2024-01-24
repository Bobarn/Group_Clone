import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productReducer from "./product";
import reviewReducer from "./reviews";
import favoritesReducer from "./favorited_items";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productReducer,
  reviews: reviewReducer,
  favorites: favoritesReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

/**
 * comments defining the store object shape used to provide
 * intelligent suggestions and autocompletion from the editor for free
 * @typedef {ReturnType<createStore>} RootStore
 */

export default configureStore;
