import { useEffect } from "react";
import { thunkGetOneReview } from "../../redux/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ReviewComponent = () => {

   const dispatch = useDispatch();

   const {productId} = useParams();

   // const reviews = useSelector(state => Object.values(state?.reviews))
   const reviews = useSelector(state => state.reviews)

   const array = Object.values(reviews)


   useEffect(() => {
      dispatch(thunkGetOneReview(productId))
   }, [dispatch, productId])


   return (
      <>

         <h1> hello world </h1>

         {array.map((review) => {
            return (
               <div key={review}>{review.review_text}</div>
            )
         })}

      </>
   )

}

export default ReviewComponent
