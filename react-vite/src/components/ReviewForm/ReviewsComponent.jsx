import { useEffect } from "react";
import { thunkGetAllReviews } from "../../redux/reviews";
import { useDispatch, useSelector } from "react-redux";


const ReviewsComponent = () => {
   const dispatch = useDispatch()

   const reviews = useSelector(state => Object.values(state?.reviews))


   useEffect(() => {
      dispatch(thunkGetAllReviews())
   }, [dispatch])

   if (!reviews) return null
   return (
      <>

         <h1> hello world
         </h1>
         {reviews.map((review) => {
            return (
               <div key={review}>{review.review_text}</div>
            )
         })}
      </>
   )

}

export default ReviewsComponent
