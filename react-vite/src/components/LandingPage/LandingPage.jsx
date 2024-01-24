import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllProductsWImages } from "../../redux/product";
import { thunkCreateFavorite } from "../../redux/favorited_items";
import { useNavigate } from "react-router-dom";
import CategoryImages from "./CategoryImages";
import TrendingImages from "./TrendingImages";
import "./LandingPage.css";

function LandingImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.products);
  const currUser = useSelector((state) => state.session.user);

  const filteredProducts = Object.values(allProducts).slice(0, 10);

  const filteredByCat = Object.values(allProducts).filter(
    (prod) => prod.category === "Art"
  );

  // LOADS PRODUCTS
  useEffect(() => {
    dispatch(thunkGetAllProductsWImages());
  }, [dispatch]);

  //

  // ADD TO FAVORITES ONCLICK FUNCTION
  const [heartStates, setHeartStates] = useState({});

  const addToFav = (productId) => {
    // e.preventDefault();
    dispatch(thunkCreateFavorite(productId));

    setHeartStates((prevHeartStates) => ({
      ...prevHeartStates,
      [productId]: !prevHeartStates[productId],
    }));
  };

  const imageCreator = () => {
    return (
      <div className="main-img-cont">
        {filteredProducts.map((product) => (
          <div key={product.id} className="single-img-tile">
            <div
              className="heart-button"
              onClick={() =>
                currUser
                  ? addToFav(product.id)
                  : window.alert("Must sign-in to add to favorites!")
              }
            >
              {heartStates[product.id] ? (
                <i className="fa-solid fa-heart filled-heart"></i>
              ) : (
                <i className="fa-regular fa-heart empty-heart"></i>
              )}
            </div>
            <div
              className="sqr-img-cont"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                className="sqr-img"
                src={product.preview_image}
                onError={(e) => {
                  e.target.src =
                    "https://i.graphicmama.com/uploads/2023/3/64182e9d20d37-spider-animated-gifs.gif";
                }}
              />
            </div>
            <div className="price-cont">
              <span>${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!allProducts) return null;
  return (
    <div className="landing-main-cont">
      <div className="greeting-cont">
        <span>
          Welcome,{" "}
          {currUser ? "back" + " " + currUser.first_name + "!" : "To Itsy"}
        </span>
      </div>
      <CategoryImages />

      <div className="landing-sqrImg-main-cont">{imageCreator()}</div>

      <TrendingImages products={filteredByCat} />
    </div>
  );
}

export default LandingImage;
