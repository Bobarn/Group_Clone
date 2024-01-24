import ProductForm from '../ProductForm.jsx';

export default function CreateProduct() {
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

  return (
    <ProductForm
      product={product}
      formType="Create Product"
    />
  );
}
