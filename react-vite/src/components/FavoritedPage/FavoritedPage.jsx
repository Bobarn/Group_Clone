import React, { useEffect } from "react";
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
  const getRelatedProducts = (category) => {
    return allProducts.filter((product) => product.category === category).slice(0, 3);
  };

  return (
    <div className="favoritescont">
      <h1>Your Favorites</h1>
      <div className="top-half">
      {favorites.map((favorite) => (
        <div key={favorite.id}>
          <NavLink to={`/products/${favorite.id}`} className="onefav">
            <img src={favorite.preview_image} className="previmg" alt={favorite.name} />
            <h2 className="itemname">{favorite.name}</h2>
            <h3 className="proddesc">{favorite.description}</h3>
            <p className="price">{favorite.price}</p>
          </NavLink>
        </div>
      ))}
      </div>

<h2 className="related-tag">Related Products</h2>
<div className="bottom-half">
      {favorites.map((favorite) => {
        // Get related products based on the category of the favorite
        const relatedProducts = getRelatedProducts(favorite.category);
        
        return (
          <div className="related-container" >
            <div key={`related_${favorite.id}`}>
              {relatedProducts.map((product) => (
                <NavLink key={product.id} to={`/products/${product.id}`} className="onefav">
                  <img src={product.preview_image} className="previmg" alt={product.name} />
                  <h2 className="itemname">{product.name}</h2>
                  <h3 className="proddesc">{product.description}</h3>
                  <p className="price">{product.price}</p>
                </NavLink>
              ))}
            </div>
            </div>
          );
        })}
        </div>
        </div>
    );
  };
  
  export default FavoritesPage;