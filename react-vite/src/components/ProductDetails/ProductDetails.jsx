import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { thunkGetAllProducts, thunkDeleteProduct } from "../../redux/product";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./ProductDetails.css";

export default function ProductDetailsPage() {
  const navigate = useNavigate();

  const { productId } = useParams();

  const dispatch = useDispatch();

  const product = useSelector((state) => state.products[productId]);

  const userId = useSelector((state) => state.session.user?.id);

  useEffect(() => {
    dispatch(thunkGetAllProducts());
  }, [dispatch]);

  function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result.toDateString();
  }

  function addProduct() {
    let products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }
    products.push({ productId: productId + 1, image: "<imageLink>" });
    localStorage.setItem("products", JSON.stringify(products));
  }

  function onClickUpdate() {
    navigate(`/products/${productId}/edit`);
  }

  function onClickDelete() {
    dispatch(thunkDeleteProduct(productId));
    navigate("/products/all");
  }

  function dropFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  function shippingDropFunction() {
    document.getElementById("shippingDropdown").classList.toggle("show");
  }

  if (!product) {
    return <></>;
  }

  return (
    <div id="product-details-main">
      <Link to="/products" className="back-button">
        {" "}
        <i className="fa-solid fa-angle-left"></i>Products
      </Link>
      <div id="product-details-body">
        <Carousel className="Carousel Images">
          {product?.images.map((image) => {
            return (
              <div>
                <img src={image?.url} alt="product image" />
              </div>
            );
          })}
        </Carousel>
        <div id="product-details-information">
          <div className="product-information">
            <h2 className="product-price">${product?.price}</h2>
            <h2 className="product-name">{product?.name}</h2>
            <h5>Sold by {`${product?.seller.first_name}`}</h5>
          </div>
          <span>
            {userId === product?.sellerId && (
              <div className="seller-actions action-button">
                <button onClick={onClickUpdate}>Update</button>
                <button onClick={onClickDelete}>Remove Item Listing</button>
              </div>
            )}
            {userId && userId !== product?.sellerId && (
              <div className="purchase-button">
                <button
                  className="purchase action-button"
                  onClick={() => alert("Feature coming soon")}
                >
                  Buy now
                </button>
                <button
                  className="purchase add-to-cart action-button"
                  onClick={() => alert("Feature coming very soon")}
                >
                  Add to Cart
                </button>
              </div>
            )}
          </span>

          <span className="product-block">
            <div className="product-details dropdown">
              <button onClick={dropFunction} className="dropbtn">
                Item details
              </button>
              <h5 id="myDropdown" class="dropdown-content">
                {product?.description}
              </h5>
            </div>
            <div className="product-details product-shipping dropdown">
              <button onClick={shippingDropFunction} className="shipbtn">
                Shipping and return policies
              </button>
              <div id="shippingDropdown" class="shipping-dropdown">
                <p>Shipping Time: {product?.shipping_time} days</p>
                <p>Estimated Arrival Date: {addDays(product?.shipping_time)}</p>
                <p>Return Policy: {product?.return_policy}</p>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
