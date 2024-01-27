import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { thunkGetAllProducts, thunkGetAllProductsByCategory } from "../../redux/product";
import DeleteProductConfirmationModal from "./ProductDeleteModal";
import {thunkCreateFavorite, thunkGetAllFavorites, thunkDeleteFavorite} from "../../redux/favorited_items";
import { thunkCreateOrder } from '../../redux/orders';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { CartContext } from "../../context/CartContext";
import Cart from "../Cart/Cart";
import StarRatings from "react-star-ratings";
import "./ProductDetails.css";
import { thunkGetOneReview } from "../../redux/reviews";
import ReviewsComponent from "../ReviewForm/ReviewsComponent";

export default function ProductDetailsPage() {
  const { cartItems, addToCart } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);

  const toggle = () => {
    setShowModal(!showModal);
  };

  const navigate = useNavigate();

  const { productId } = useParams();

  const dispatch = useDispatch();

  const product = useSelector((state) => state.products[productId]);
  const userId = useSelector((state) => state.session.user?.id);

  const categoryProducts = useSelector((state) => state.products[product?.category]);

const heartStates = useSelector((state) => state.favorites);

  const reviews = useSelector((state) => state.reviews);
  // converting the reviews object of objects to an array
  const reviewsArray = Object.values(reviews);

  useEffect(() => {
    dispatch(thunkGetAllProducts());
}, [dispatch, product?.reviews]);
  useEffect(() => {
      dispatch(thunkGetAllProductsByCategory(product?.category))
  }, [product?.category])

  useEffect(() => {
    dispatch(thunkGetOneReview(productId))
    dispatch(thunkGetAllFavorites())
  }, []);

  function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result.toDateString();
  }

  function buyNow() {
    alert("Thank you for your purchase, an order has been made for this item!")
    dispatch(thunkCreateOrder([{id: productId, quantity: 1}]))
  }


  function onClickUpdate() {
    navigate(`/products/${productId}/edit`);
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

        if(userId && heartStates[productId]) {
            dispatch(thunkDeleteFavorite(productId))
        }
        else if(userId) {
            dispatch(thunkCreateFavorite(productId));
        }

        // setHeartStates((prevHeartStates) => ({
        //   ...prevHeartStates,
        //   [productId]: !prevHeartStates[productId],
        // }));
      };

    const imageCreator = () => {
    return (
        <div className="suggestions-img-cont">
        {categoryProducts?.map((item) => (
            <div key={item.id} id='suggested-img-tile' className="single-img-tile">
            <div
                className="heart-button suggested-hearts"
                id='product-heart'
                onClick={() =>
                userId
                    ? addToFav(item.id)
                    : window.alert("Must sign-in to add to favorites!")
                }
            >
                {heartStates[item.id] ? (
                <i id='suggested-heart' className="fa-solid fa-heart filled-heart"></i>
                ) : (
                <i id='suggested-heart' className="fa-regular fa-heart empty-heart"></i>
                )}
            </div>
            <div
                className="sqr-img-cont suggested-img-cont"
                onClick={() => navigate(`/products/${item.id}`)}
            >
                <img
                id='suggested-img'
                className="sqr-img"
                src={item.preview_image}
                onError={(e) => {
                    e.target.src =
                    "https://i.graphicmama.com/uploads/2023/3/64182e9d20d37-spider-animated-gifs.gif";
                }}
                />
            </div>

                <div id='suggested-info'>
                    <p id='suggested-price'>${item.price}</p>
                    <p id='suggested-name'>{item.name}</p>
                    {item.free_shipping && <p id='free-shipping-banner'>Free shipping!</p>}
                </div>
            </div>
        ))}
        </div>
    );
    };

  if (!product) {
    return <></>;
  }

    return (
        <>
            <div className='product-details-main'>
                        {!showModal && userId && <button id='cart-button'  onClick={toggle}><i className="fa-solid fa-cart-shopping fa-xl"></i> ({cartItems.length})</button>}
                        <Cart showModal={showModal} toggle={toggle} />
                <div id='product-details-body'>
                    <div className='review-area'>
                        <Carousel className='Carousel Images'>
                            {product?.images.map((image) => {
                                return (<div className="Carousel-image" key={image?.id}>
                                                        <div className="heart-button-big" onClick={() => addToFav(product?.id)}>
                {heartStates[product.id] ? (
                    <i className="fa-solid fa-xl fa-heart filled-heart big-heart"></i>
                    ) : (
                        <i className="fa-regular fa-xl fa-heart empty-heart big-heart"></i>
                        )}
                        </div>
                                    <img src={image?.url} onError={"https://www.analyticdesign.com/wp-content/uploads/2018/07/unnamed-574x675.gif"} alt="product image"/>
                                </div>)
                            })}
                        </Carousel>

                        <span className='reviews-stats'>
                        <h2 className='stat'>{numberWithCommas(product?.reviews)} Reviews </h2>
                        {/* <StarRatings className="stat" rating={product?.star_rating ? product?.star_rating : 0} starDimension="20px" starSpacing="5px" /> */}
                        <StarRatings
                className="stat"
                rating={product?.star_rating === null ? 0 : product?.star_rating}
                starRatedColor="black"
                starEmptyColor="gray"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="3px"
                name="rating"/>
                        </span>
                        <ReviewsComponent reviews={reviewsArray} />
                    </div>
                    <div id='product-details-information'>
                        <div className='product-information'>
                            <h2 className='product-detail-price'>${product?.price}</h2>
                            <h2 className='product-detail-name'>{product?.name}</h2>
                            <h5 className='product-detail-seller'>Sold by {`${product?.seller.first_name}`}</h5>
                        </div>
                        <span>
                            {userId === product?.sellerId &&
                            <div className='seller-actions'>
                                <button onClick={onClickUpdate}>Update</button>
                                <OpenModalButton modalComponent={<DeleteProductConfirmationModal productId={productId}/>} buttonText={'Remove Item Listing'}/>
                            </div>}
                            {userId && userId !== product?.sellerId && <div className='purchase-button'>
                                <button className='purchase action-button' onClick={buyNow}>Buy it now</button>
                                <button className='purchase add-to-cart action-button' onClick={() => addToCart(product)}>Add to Cart</button>
                            </div>}
                        </span>

                        <span className='product-block'>
                            <div className='product-details dropdown'>
                                <button onClick={dropFunction} className='dropbtn'>Item details</button>
                            <h5 id="myDropdown" className="dropdown-content">
                                <p>{product?.description}</p>
                            </h5>
                            </div>
                            <div className='product-details product-shipping dropdown'>
                                <button onClick={shippingDropFunction} className='shipbtn'>Shipping and return policies</button>
                                <div id="shippingDropdown" className="shipping-dropdown">
                                    <p><i className="fa-regular fa-calendar"></i>  Estimated Shipping Time: {product?.shipping_time} days</p>
                                    <p><i className="fa-solid fa-truck-fast"></i>  Order today and get by {addDays(product?.shipping_time)}</p>
                                    <p><i className="fa-solid fa-boxes-packing"></i>  Return Policy: {product?.return_policy}</p>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <h2 id='suggestions-title'>
                Interested in More Like This?
            </h2>
            <div className='product-details-main suggested-products-row'>
            {imageCreator()}
            </div>
        </>
    )
}
