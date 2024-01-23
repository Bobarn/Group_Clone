import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import {thunkGetAllProducts} from "../../redux/product";


function LandingImage(id){
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.products)
    console.log('!!!!!',allProducts)

    useEffect(() =>{
        dispatch(thunkGetAllProducts())
    },[dispatch]);

   if  (!allProducts)return null
    return(

        <>
        <h1>allProducts</h1>
        </>

    )


}

export default LandingImage
