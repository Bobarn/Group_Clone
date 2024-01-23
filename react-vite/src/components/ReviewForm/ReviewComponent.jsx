import { useEffect } from "react";
import { thunkGetAllReviews } from "../../redux/reviews";
import { useDispatch, useSelector } from "react-redux";


export default function ReviewComponent () {



const reviews = useSelector(state => state?.reviews)
const dispatch = useDispatch()
 useEffect( ()=> {
    dispatch(thunkGetAllReviews())
 }, [dispatch])

    // getJSON()
    // .then((result) => console.log(result))
    // .catch((error) => console.error(error));

    // thunkGetAllReviews.then((result) => console.log(result))
    // console.log(dispatch(thunkGetAllReviews()) , "!!!!!!!!!!!!!!!!!!!!!!!!")
 console.log("REVIEWS!!!!!!!!!!!!!!!!" , reviews)
 if(!reviews) return null
return (
    <>

 <h1> hello world </h1>
 <div> def {reviews.map( (review) => <p key={review} > abc {review} </p>)} </div>
    </>
)

}
