import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllFavorites } from "../../redux/favorited_items";
import { NavLink } from "react-router-dom";
import "./FavoritedPage.css";
import { thunkGetAllProducts } from "../../redux/product";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const allFavorites = useSelector((state) => Object.values(state.favorites));
  const favorites = Object.values(allFavorites);

  useEffect(() => {
    dispatch(thunkGetAllFavorites());
    dispatch(thunkGetAllProducts())
  }, [dispatch]);

  // Assuming state.products contains all products
  const allProducts = useSelector((state) => Object.values(state.products));

  // Function to filter products based on the category of favorites
  const getRelatedProducts = () => {

    let related = allProducts.filter((product) => product.category === favorites[0].category);
    return (related.map((favorite) => {
      // Get related products based on the category of the favorite
      // const relatedProducts = getRelatedProducts(favorite.category);
      return (

        <div key={favorite.id} className="favorites-section" >
        <NavLink key={favorite.id} to={`/products/${favorite.id}`} className="onefav">
          <img src={favorite.preview_image} className="previmg responsive1" alt={favorite.name} />
          <h2 className="itemname">{favorite.name}</h2>
          <h3 className="proddesc">{favorite.description}</h3>
          <p className="price">{favorite.price}</p>
        </NavLink>
        </div>
      )
      }))
  };

  return (
    <div className="row main-cont">
    <div className="favoritescont column">
      <h2>Favorite Items</h2>
      <div className="top-half">
      {favorites.map((favorite) => (
              /*this was added */

        <div key={favorite.id}>

          <NavLink to={`/products/${favorite.id}`} className="onefav">
            <img src={favorite.preview_image} className="previmg responsive" alt={favorite.name} />
            <h3 className="itemname">{favorite.name}</h3>
            <p className="proddesc">{favorite.description}</p>
            <p className="price">{favorite.price}</p>
          </NavLink>
        </div>
      ))}
      </div>

  {favorites.length > 0 &&
  <>
  <h3 className="related-tag">Related Products</h3>
  <div className="bottom-half">
    {getRelatedProducts()}
          </div>
  </>
  }
          </div>
          </div>
      );
  };

  export default FavoritesPage;
