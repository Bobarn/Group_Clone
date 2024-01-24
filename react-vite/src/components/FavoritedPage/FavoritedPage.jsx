import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllFavorites } from "../../redux/favorited_items";
import { NavLink } from "react-router-dom";
import "./FavoritedPage.css";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => Object.values(state.favorites));

  useEffect(() => {
    dispatch(thunkGetAllFavorites());
  }, [dispatch]);

  if (!favorites) return null;

  return (
    <div className="favoritescont">
      {favorites.map((favorite) => (
        <div key={favorite}>
          <NavLink to={`/products/${favorite.productId}`} className="onefav">
            <img src={favorite.preview_image} className="previmg"></img>
            <h2 className="itemname">{favorite.name}</h2>
            <h3 className="proddesc">{favorite.description}</h3>
            <p className="price">{favorite.price}</p>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
