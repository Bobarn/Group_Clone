import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetAllByCat, clearState } from "../../redux/product";
import { thunkCreateFavorite,thunkDeleteFavorite  } from "../../redux/favorited_items";
import StarRatings from 'react-star-ratings'
import "./CategoryProducts.css"


function CategoryProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { category } = useParams();
  const products = useSelector((state) => state.products);
  const currUser = useSelector((state) => state.session.user);
  const allCatProds = Object.values(products)
   console.log('ALL PRODUCTS', allCatProds)


  useEffect(() => {
    dispatch(thunkGetAllByCat(category));
    // Only way I can get it to only pull category otherwise it loads all products
    return () => dispatch(clearState())
  }, [dispatch,category]);



  const [heartStates, setHeartStates] = useState({});

  const addToFav = (productId) => {
    // e.preventDefault();
    dispatch(thunkCreateFavorite(productId));

    if(currUser.id && heartStates[productId]) {
        dispatch(thunkDeleteFavorite(productId))
      }
      else if(currUser.id) {
        dispatch(thunkCreateFavorite(productId));
      }

    setHeartStates((prevHeartStates) => ({
      ...prevHeartStates,
      [productId]: !prevHeartStates[productId],
    }));
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

  if(!allCatProds.length) return null
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
