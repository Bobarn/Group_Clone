import { useNavigate } from "react-router-dom";

function TrendingImages({ products }) {
  //   const allProducts = useSelector((state) => state.products);
  const navigate = useNavigate();
  //   const currUser = useSelector((state) => state.session.user);

  //   useEffect(() => {
  //     dispatch(thunkGetAllProductsWImages());
  //   }, [dispatch]);

  if (!products.length) return null;
  return (
    <div className="trending-img-main-cont">
      {products.map((product) => (
        <div
          key={product.id}
          className="single-img-tile"
          id="rec-single-tile"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <img
            className="rectangle-img"
            src={product.preview_image}
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
  );
}

export default TrendingImages;
