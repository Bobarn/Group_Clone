import ProductForm from '../ProductForm.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function CreateProduct() {
  const navigate = useNavigate()
  const product = {
    name: '',
    description: '',
    price: 0,
    category: '',
    shipping_time: '',
    return_policy: '',
    free_shipping: false,
    preview_image: ''
  };

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if(!user) {
      navigate('/')
    }

  }, [user])

  return (
    <ProductForm
      product={product}
      formType="Create Product"
    />
  );
}
