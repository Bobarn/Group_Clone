import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import {thunkGetAllProductsWImages} from "../../redux/product";


function LandingImage({category}){

    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.products)
    const categories =["Jewelry","Clothes","Art","Art Supplies","Electronics","Pet Supplies"]
    // allows random category or sets category to prop passed in
    const randomIndx = Math.floor(Math.random() * categories.length);
    !category? category = categories[randomIndx] : null
    const filteredProducts = Object.values(allProducts).filter(product => product.category == category)


    useEffect(() =>{
        dispatch(thunkGetAllProductsWImages())
    },[dispatch]);

    const imageCreator = () =>{
       return( <div className='main-img-cont'>
            {filteredProducts.map( product => (
                <div key={product.id} className="single-img-tile">
                    <img
                    src={product.product_images.find(img => img.preview === true).url}
                    // src={product.product_images[0].url}
                    onError={(e) => {
                        e.target.src =
                        "https://i.graphicmama.com/uploads/2023/3/64182e9d20d37-spider-animated-gifs.gif"
                      }}
                    />

                    <span>${product.price}</span>
                </div>
            ))}

        </div>
       )
    }





   if  (!allProducts)return null
    return(
        <div>
            {imageCreator()}

        </div>

    )


}

export default LandingImage
