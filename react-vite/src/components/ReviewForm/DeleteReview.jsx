import "./DeleteReview.css";
import { useDispatch , useSelector} from "react-redux";
import { useEffect } from "react";
import { thunkDeleteReview, thunkGetAllReviews } from "../../redux/reviews";
import { useModal } from "../../context/Modal";
import { thunkGetAllProducts } from "../../redux/product";
import { useParams } from "react-router-dom";


 function DeleteReview({reviewId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();


//   useEffect(() => {
//     dispatch(thunkGetAllReviews().);
//   }, [dispatch]);


// const onClickDelete = async (e) =>{
//     e.preventDefault();
//      await dispatch(thunkDeleteReview(reviews[id].id))

//     await dispatch(thunkGetDetailsSpot(spotId)).then(() =>{
//       closeModal()
//     })

const { productId } = useParams();
const product = useSelector((state) => state.products[productId]);

  const  deleteReview = (e) => {
    // console.log(reviewId, "LOOOK HERE!!!")
    e.preventDefault();
    // console.log()
     dispatch(thunkDeleteReview(reviewId));

     dispatch(thunkGetAllProducts(product));
    // console.log()
    closeModal();

  };

  const cancel = () => {
    closeModal();
  };

  return (
    <>
      <h1>CONFIRM DELETE</h1>
      <p> Are you sure you want to delete this review? </p>
      <button className="yes-button" onClick={deleteReview}>
        YES
      </button>
      <button className="cancel-button" onClick={cancel}>
        CANCEL
      </button>
    </>
  );
}

export default DeleteReview;
