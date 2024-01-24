import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { thunkGetAllProducts } from '../../redux/product'
import DeleteProductConfirmationModal from './ProductDeleteModal';
import { thunkCreateFavorite, thunkDeleteFavorite } from '../../redux/favorited_items';
import { thunkCreateOrder } from '../../redux/orders';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import { CartContext } from '../../context/CartContext';
import Cart from '../Cart/Cart'
import StarRatings from 'react-star-ratings'
import "./ProductDetails.css"


export default function ProductDetailsPage() {

    const {cartItems, addToCart } = useContext(CartContext)

    const [showModal, setShowModal] = useState(false)

    const toggle = () => {
        setShowModal(!showModal)
      }

    const navigate = useNavigate();

  const { productId } = useParams();

  const dispatch = useDispatch();

  const product = useSelector((state) => state.products[productId]);

  const userId = useSelector((state) => state.session.user?.id);
  const [heartStates, setHeartStates] = useState({});

  useEffect(() => {
    dispatch(thunkGetAllProducts());
  }, [dispatch]);

  function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result.toDateString();
  }

  function buyNow() {
    dispatch(thunkCreateOrder([{id: productId, quantity: 1}]))
  }


    function onClickUpdate() {
        navigate(`/products/${productId}/edit`)
    }

  function dropFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  function shippingDropFunction() {
    document.getElementById("shippingDropdown").classList.toggle("show");
  }

    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }


    const addToFav = (productId) => {

        if(userId && heartStates[product?.id]) {
            dispatch(thunkDeleteFavorite(productId))
        }
        else if(userId) {
            dispatch(thunkCreateFavorite(productId));
        }

        setHeartStates((prevHeartStates) => ({
          ...prevHeartStates,
          [productId]: !prevHeartStates[productId],
        }));
      };


    if(!product) {
        return <></>
    }

    return (
        <div id='product-details-main'>
                    <Link to='/' className='back-button'> <i className="fa-solid fa-angle-left"></i>Products</Link>
                    {!showModal && <button id='cart-button'  onClick={toggle}>Cart ({cartItems.length})</button>}
                    <Cart showModal={showModal} toggle={toggle} />
            <div id='product-details-body'>
                <div className='review-area'>
                    <Carousel className='Carousel Images'>
                        {product?.images.map((image) => {
                            return (<div key={image?.id}>
                                                    <div className="heart-button-big" onClick={() => addToFav(product?.id)}>
              {heartStates[product.id] ? (
                  <i className="fa-solid fa-xl fa-heart filled-heart"></i>
                  ) : (
                      <i className="fa-regular fa-xl fa-heart empty-heart"></i>
                      )}
                    </div>
                                <img src={image?.url} alt="product image"/>
                            </div>)
                        })}
                    </Carousel>

                    <span className='reviews-stats'>
                    <h2 className='stat'>{numberWithCommas(product?.reviews)} Reviews </h2>
                    <StarRatings className="stat" rating={product?.star_rating ? product?.star_rating : 0} starDimension="30px" starSpacing="5px" />
                    </span>
                </div>
                <div id='product-details-information'>
                    <div className='product-information'>
                        <h2 className='product-price'>${product?.price}</h2>
                        <h2 className='product-name'>{product?.name}</h2>
                        <h5>Sold by {`${product?.seller.first_name}`}</h5>
                    </div>
                    <span>
                        {userId === product?.sellerId &&
                        <div className='seller-actions action-button'>
                            <button onClick={onClickUpdate}>Update</button>
                            <OpenModalButton modalComponent={<DeleteProductConfirmationModal productId={productId}/>} buttonText={'Remove Item Listing'}/>
                        </div>}
                        {userId && userId !== product?.sellerId && <div className='purchase-button'>
                            <button className='purchase action-button' onClick={buyNow}>Buy now</button>
                            <button className='purchase add-to-cart action-button' onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>}
                    </span>

                    <span className='product-block'>
                        <div className='product-details dropdown'>
                            <button onClick={dropFunction} className='dropbtn'>Item details</button>
                        <h5 id="myDropdown" className="dropdown-content">
                            {product?.description}
                        </h5>
                        </div>
                        <div className='product-details product-shipping dropdown'>
                            <button onClick={shippingDropFunction} className='shipbtn'>Shipping and return policies</button>
                            <div id="shippingDropdown" className="shipping-dropdown">
                                <p>Shipping Time: {product?.shipping_time} days</p>
                                <p>Estimated Arrival Date: {addDays(product?.shipping_time)}</p>
                                <p>Return Policy: {product?.return_policy}</p>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}
