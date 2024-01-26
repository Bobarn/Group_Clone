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
    }, [dispatch, ])


    return (
        <>
        <h1 id="store-title">{user?.first_name}'s Store</h1>
        <div id="store-container">
            {userProducts?.map((product) => (
                <div className="store-product-container" key={product.id}>
                    <div className="store-img-tile">
                        <img onClick={() => navigate(`/products/${product?.id}`)} className="store-img" src={product.preview_image}></img>
                    </div>
                    <p>{product?.name}</p>
                </div>
            )) }
        </div>
        </>
    )
}
