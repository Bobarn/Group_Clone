import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllProducts } from '../../../redux/product';
import ProductForm from '../ProductForm';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllProducts());
}, [dispatch]);

const product = useSelector((state) => state.products[productId]);

  if (!product) return(<></>);

  if(product.sellerId !== user?.id) {
    navigate('/')
  }

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(product).length > 1 && (
      <>
        <ProductForm
          product={{
            name: product?.name,
            description: product?.description,
            price: product?.price,
            shipping_time: product?.shipping_time,
            free_shipping: product?.free_shipping === 'true',
            category: product?.category,
            return_policy: product?.return_policy
          }}
          productId={productId}
          formType="Update Product"
        />
      </>
    )
  );
};

export default UpdateProduct;
