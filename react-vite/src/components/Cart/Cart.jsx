import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import './Cart.css'

export default function Cart({showModal, toggle}) {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)

    return (
        showModal && (
          <div id='cart'>
              <button onClick={toggle}>
                Close
              </button>
            <h1>Cart</h1>
            <div>
            </div>
            <div>
              {cartItems.map((product) => (
                <div key={product.id}>
                  <div>
                    <img src={product.preview_image} alt={product.name} className="product-cart-preview" />
                    <div>
                      <h1>{product.name}</h1>
                      <p>{product.price}</p>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => {addToCart(product)}}>
                      +
                    </button>
                    <p>{product.quantity}</p>
                    <button onClick={() => {removeFromCart(product)}}>
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {
              cartItems.length > 0 ? (
                <div>
              <h1>Total: ${getCartTotal()}</h1>
              <button onClick={() => {clearCart()}}>
                Clear cart
              </button>
            </div>
              ) : (
                <h1>Your cart is empty</h1>
              )
            }
          </div>
        )
      )
    }
