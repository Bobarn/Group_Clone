import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllProductsWImages } from "../../redux/product";
import CategoryImages from "./CategoryImages";
import TrendingImages from "./TrendingImages";
import "./LandingPage.css";

function LandingImage() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const currUser = useSelector((state) => state.session.user);

  //POTENTIAL ERROR WITH CONTINUOUS RELOADING
  //   const categories = [
  //     "Jewelry",
  //     "Clothes",
  //     "Art",
  //     "Art Supplies",
  //     "Electronics",
  //     "Pet Supplies",
  //   ];
  // allows random category or sets category to prop passed in
  //   const randomIndx = Math.floor(Math.random() * categories.length);
  //   !category ? (category = categories[randomIndx]) : null;
  //   const filteredProducts = Object.values(allProducts)
  //     .filter((product) => product.category == category)
  //     .slice(0, 11);

  const filteredProducts = Object.values(Object.values(allProducts).slice(0, 11));

  // LOADS PRODUCTS
  useEffect(() => {
    dispatch(thunkGetAllProductsWImages());
  }, [dispatch]);

  //





  // ADD TO FAVORITES ONCLICK FUNCTION
  const [heartStates, setHeartStates] = useState({});

  const addToFav = (productId) => {
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
            <div className="heart-button" onClick={() => addToFav(product.id)}>
              {heartStates[product.id] ? (
                <i className="fa-solid fa-heart filled-heart"></i>
              ) : (
                <i className="fa-regular fa-heart empty-heart"></i>
              )}
              {/* {!className ? (
                <i className="fa-regular fa-heart heartStates"></i>
              ) : (
                <i className="fa-solid fa-heart heartStates"></i>
              )} */}
            </div>
            <img
              className="sqr-img"
              src={
                product.product_images.find((img) => img.preview === true).url
              }
              onError={(e) => {
                e.target.src =
                  "https://i.graphicmama.com/uploads/2023/3/64182e9d20d37-spider-animated-gifs.gif";
              }}
            />
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
        <span>Welcome, { currUser? currUser.first_name : 'To Itsy'}</span>
        <CategoryImages />

        <div className="landing-main-cont">{imageCreator()}</div>

        <TrendingImages />

    </div>
  );
}

export default LandingImage;
