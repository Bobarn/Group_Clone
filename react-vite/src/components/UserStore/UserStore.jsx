import { thunkGetUserStore } from "../../redux/product"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import './UserStore.css'
import { useNavigate } from "react-router-dom";

export default function UserStore() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userProducts = useSelector((state) => state.products.User)
    const user = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(thunkGetUserStore());
        if(!user) {
            navigate('/')
        }
    }, [dispatch, user])


    return (
        <>
        <h1 id="store-title">Your Store</h1>
        <div id="store-container">
            {userProducts?.map((product) => (
                <div className="store-product-container" key={product.id}>
                    <div onClick={() => navigate(`/products/${product?.id}`)} className="store-img-tile">
                        <img className="store-img" src={product.preview_image}></img>
                    <p>{product?.name}</p>
                    </div>
                </div>
            )) }
            <div className="store-product-container">
                <div className="store-img-tile">
                        <img onClick={() => navigate(`/products/new`)} className="store-img" src="https://static-00.iconduck.com/assets.00/plus-large-thick-icon-2048x2048-zb1sludh.png"></img>
                <h3>Post a new item!</h3>
                </div>
            </div>
        </div>
        </>
    )
}
