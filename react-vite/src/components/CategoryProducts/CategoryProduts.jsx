import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetAllProductsByCategory } from "../../redux/product";
import { thunkCreateFavorite,thunkDeleteFavorite, thunkGetAllFavorites  } from "../../redux/favorited_items";
import StarRatings from 'react-star-ratings'
import "./CategoryProducts.css"


function CategoryProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  let { category } = useParams();
  const allCatProds = useSelector((state) => state.products[category]);
  const currUser = useSelector((state) => state.session.user);



  useEffect(() => {
    dispatch(thunkGetAllProductsByCategory(category));
    // Only way I can get it to only pull category otherwise it loads all products
    // return () => dispatch(clearState())
    dispatch(thunkGetAllFavorites())
  }, [dispatch,category]);



  const heartStates = useSelector((state) => state.favorites);

  const addToFav = (productId) => {
    // e.preventDefault();
    dispatch(thunkCreateFavorite(productId));

    if(currUser.id && heartStates[productId]) {
      console.log(productId)
        dispatch(thunkDeleteFavorite(productId))
      }
      else if(currUser.id) {
        dispatch(thunkCreateFavorite(productId));
      }

  };






//   //Create product tiles
  const createCatTiles = () => {
    return (
      <div className="tile-main-cont">

        {allCatProds.map((product) => (
          <div key={product.id} className="single-tile" onClick={() => navigate(`/products/${product.id}`)}>
            <div
            //   className="heart-button"
              className="cat-heart-button"
              onClick={() =>
                currUser
                  ? addToFav(product.id)
                  : window.alert("Must sign-in to add to favorites!")
              }
            >
              {heartStates[product.id] ? (
                <i className="fa-solid fa-heart cat-filled-heart"></i>
              ) : (
                <i className="fa-regular fa-heart cat-empty-heart"></i>
              )}
            </div>
            <div
            //   className="sqr-img-cont"
            className="cat-sqr-img-cont"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                // className="sqr-img"
                className="cat-sqr-img"
                src={product.preview_image}
                onError={(e) => {
                  e.target.src =
                    "https://i.graphicmama.com/uploads/2023/3/64182e9d20d37-spider-animated-gifs.gif";
                }}
              />
            </div>
            <div className="cat-title-cont">
                <span>{product.name}</span>

            </div>
            <div className='review-cont'>
            <StarRatings
                rating={product.reviews}
                starRatedColor="black"
                starEmptyColor="#d3d3d1"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="3px"
                name="rating"/>

            </div>

            <div className='cat-seller-cont'>
                <span>Seller: {product.seller.username}</span>

            </div>
            {/* <div className="price-cont"> */}
            <div className="cat-price-cont">
              <span>${product.price}</span>
            </div>
            <div className={ product.free_shipping?'cat-shipping-cont':null}>
                <span>{product.free_shipping ? "Free shipping":null}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if(!allCatProds) return null
  return(
  <div className="cat-page-main-cont">
    <div className='cat-head-cont'>
    <span>{`Explore our collection and shop all ${category}`}</span>

    </div>
    <div className='cat-func-cont'>
    {createCatTiles()}

    </div>
    </div>
    )
}

export default CategoryProducts;
