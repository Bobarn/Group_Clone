import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllProductsWImages } from "../../redux/product";
import { useNavigate } from "react-router-dom";

function TrendingImages() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const navigate = useNavigate()
//   const currUser = useSelector((state) => state.session.user);
  const filterBy = "Art";
  const filteredProducts = Object.values(allProducts)
    .filter((prod) => prod.category === filterBy)
    .slice(0, 11);

  useEffect(() => {
    dispatch(thunkGetAllProductsWImages());
  }, [dispatch]);

  // UNCOMMENT THIS ONCE MERGE IS DONE AS WELL AS LINE 32 DELETE LINE 31
  // const handleOnClick = (productId) =>{
  //   navigate(`/products/${productId}`)

  // }


return (
    <div className="trending-img-main-cont">
      <div className="main-img-cont">
        {filteredProducts.map((product) => (
                <div key={product.id} className="single-img-tile" onClick={() => navigate(`/products/${product.id}`)}>
            <img
              className="rectangle-img"
              src={
                product?.product_images.find((img) => img.preview === true).url
              }
              onError={(e) => {
                e.target.src =
                  "https://i.graphicmama.com/uploads/2023/3/64182e9d20d37-spider-animated-gifs.gif";
              }}
            />
            <div className="name-cont">
              <span>{product.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingImages;
