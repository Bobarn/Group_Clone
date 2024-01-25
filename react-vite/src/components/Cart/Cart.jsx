import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
import CheckoutConfirmationModal from './CheckoutConfirmationModal'
import OpenModalButton from '../OpenModalButton/OpenModalButton'

export default function Cart({showModal, toggle}) {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
    const navigate = useNavigate();
    return (
        showModal && (
          <div id='cart'>
              <button id='cart-close' onClick={toggle}>
                Close
              </button>
            <h1 id='cart-title'>Cart</h1>
            <div>
            </div>
            <div>
              {cartItems.map((product) => (
                <div key={product.id}>
                  <div onClick={() => {navigate(`/products/${product.id}`)}} className='cart-item'>
                    <img src={product.preview_image} alt={product.name} className="product-cart-preview" />
                    <div className='cart-item-info'>
                      <h4>{product.name}</h4>
                      <p>${product.price}</p>
                    </div>
                  </div>
                  <div className='quantity-manager'>
                    <button className='quantity-button' onClick={() => {addToCart(product)}}>
                    <i className="fa-solid fa-plus"></i>
                    </button>
                    <p>{product.quantity}</p>
                    <button className='quantity-button' onClick={() => {removeFromCart(product)}}>
                    <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {
              cartItems.length > 0 ? (
                <div>
              <h1>Total: ${getCartTotal()}</h1>
              <div id='cart-done-container'>
              <OpenModalButton modalComponent={<CheckoutConfirmationModal cartItems={cartItems}/>} buttonText={'Checkout'}/>
              <button className='cart-done' onClick={() => {clearCart()}}>
                Clear cart
              </button>
              </div>
            </div>
              ) : (
                <h1 className='cart-empty'>Your cart is empty</h1>
              )
            }
          </div>
        )
      )
    }
