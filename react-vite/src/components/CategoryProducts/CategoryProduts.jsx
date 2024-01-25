import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetAllByCat } from "../../redux/product";

function CategoryProducts() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const products = useSelector((state) => state.products);
  const allProducts = Object.values(products)
   console.log('ALL PRODUCTS', allProducts)
  useEffect(() => {
    dispatch(thunkGetAllByCat(category));
  }, [dispatch]);

  const [heartStates, setHeartStates] = useState({});

  const addToFav = (productId) => {
    // e.preventDefault();
    dispatch(thunkCreateFavorite(productId));

    setHeartStates((prevHeartStates) => ({
      ...prevHeartStates,
      [productId]: !prevHeartStates[productId],
    }));
  };

  //Create product tiles
  const createCatTiles = () => {
    return (
      <div className="tile-main-cont">
        {allProducts.map((product) => (
          <div key={product.id} className="single-tile">
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

  if(!allProducts.length) return null
  return(
  <div className="category-main-cont">
    <div>
    {createCatTiles()}

    </div>
    </div>
    )
}

export default CategoryProducts;
