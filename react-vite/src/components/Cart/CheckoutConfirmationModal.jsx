// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal.jsx';
import { thunkCreateOrder } from '../../redux/orders'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import './CheckoutConfirmationModal.css'

export default function CheckoutConfirmationModal( { cartItems } ) {
    const { clearCart } = useContext(CartContext)
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = () => {
      closeModal()
        dispatch(thunkCreateOrder(cartItems))
        clearCart()

    };

    const handleCancel = () => {

      return closeModal();
    }

    return (
      <div id='checkout-cart-modal'>
        <h1>Confirm Checkout</h1>
        <h3>Are you sure you want to finish up this shopping spree?</h3>
        <div id='cart-buttons-cont'>
          <button className='checkout-button' onClick={handleSubmit}><h2 className='cart-button-title'>Yes</h2> &#40;Checkout Now&#41;</button>
          <button className='keep-button' onClick={handleCancel}><h2 className='cart-button-title'>No</h2> &#40;Keep Shopping&#41;</button>
        </div>
      </div>
    );
  }
