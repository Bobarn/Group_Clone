import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetAllByCat } from "../../redux/product";

function CategoryProducts() {
  const dispatch = useDispatch();
  const {cat} = useParams()

//   allProducts = useSelector((state) => state.products);
  console.log('CATS', cat)

//   useEffect(() => {
//     dispatch(thunkGetAllByCat(cat));
//   }, [dispatch]);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default CategoryProducts;
