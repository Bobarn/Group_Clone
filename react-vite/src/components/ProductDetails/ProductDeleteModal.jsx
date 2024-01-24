import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal.jsx';
import { thunkDeleteProduct } from '../../redux/product.js';

export default function DeleteProductConfirmationModal( { productId } ) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const navigate = useNavigate();

    const handleSubmit = () => {
      closeModal()
      console.log(productId, "Here is the product's ID")

      dispatch(thunkDeleteProduct(productId))
        .then(navigate(`/`))
    };

    const handleCancel = () => {

      return closeModal();
    }

    return (
      <div id='delete-product-modal'>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to remove this listing?</h3>
        <button className='delete-button' onClick={handleSubmit}>Yes &#40;Delete Item&#41;</button>
        <button className='keep-button' onClick={handleCancel}>No &#40;Keep Item&#41;</button>
      </div>
    );
  }
