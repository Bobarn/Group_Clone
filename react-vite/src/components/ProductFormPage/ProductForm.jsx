import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateProduct, thunkUpdateProduct } from '../../redux/product';

const ProductForm = ({ product, formType, productId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name,setName] = useState(product?.name)
    const [description, setDescription] = useState(product?.description)
    let [price, setPrice] = useState(product?.price);
    const [category, setCategory] = useState(product?.category)
    const [free_shipping, setFree_shipping] = useState(product?.free_shipping)
    const [return_policy, setReturn_policy] = useState(product?.return_policy)
    let [shipping_time, setShipping_time] = useState(product?.shipping_time)
    const [image, setImage] = useState(product?.preview_image)
    const [disabled, setDisabled] = useState(false);
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setDisabled(true)

        setSubmitted(true)
        price = parseInt(price)

        shipping_time = parseInt(shipping_time)

        product = { name, description, price, category, shipping_time, return_policy, free_shipping};

        if(Object.values(errors).length) {
            product.errors = errors;
        }

        if(formType === 'Create Product' && !product.errors) {
            // console.log(product)
            product = await dispatch(thunkCreateProduct(product, image));
            // console.log(product)

        } else if (formType === "Update Product" && !product.errors) {
            console.log(product)
            console.log(productId)
            product = await dispatch(thunkUpdateProduct(productId, product))
            console.log("after thunk", product)
        } else{

            setDisabled(false)

            return null;
        }

        if(product.errors) {

            setErrors(product.errors);

            setDisabled(false)
        } else {

            navigate(`/products/${product.product.id}`)
        }
    };

    useEffect(() => {
        const newErrors = {};

        if(!name) {
            newErrors.name = "Name is required"
        }
        if(!description) {
            newErrors.description = "Description is required"
        }
        if(!category) {
            newErrors.category = "Category is required"
        }
        if(!return_policy) {
            newErrors.return_policy = "This product needs a return policy"
        }
        if(!price) {
            newErrors.price = "A price is required"
        }
        if(!shipping_time) {
            newErrors.shipping_time = "Estimated shipping time is required"
        }

        setErrors(newErrors)
    }, [submitted, name, description, category, return_policy, price, shipping_time])

    return (
        <form id='product-form' onSubmit={handleSubmit}>
            {formType === 'Create Product' ?
            <div id='product-form-heading'>
                <h2>Post Your Wares</h2>
                <h5>You&#39;re just a few steps away from the start of your store!</h5>
            </div> :
            <div id='product-form-headings'>
                <h2>Making changes?</h2>
                <h5>Get them back on the web quick!</h5>
            </div>}

            <div id='product-form-input-area'>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <h2>What will you name your product?</h2>
                        <label>
                            <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        {submitted && <div className='errors'>{errors.name}</div>}
                    </div>
                </div>
                {formType == "Create Product" &&
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <h2>What does it look like?</h2>
                        <h3>Share a picture with us!</h3>
                        <label>
                            <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            />
                        </label>
                        {submitted && <div className='errors'>{errors.name}</div>}
                    </div>
                </div>
                }
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <h2>How would you describe your product?</h2>
                        <h3>Tell us what you find neat about.</h3>
                        <label>
                            <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        {submitted && <div className='errors'>{errors.description}</div>}
                    </div>
                </div>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <h2>How much will it cost?</h2>
                        <label>
                            <input
                            type="number"
                            min="0.00"
                            step="0.01"
                            placeholder='0'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        {submitted && <div className='errors'>{errors.price}</div>}
                    </div>
                </div>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <h2>What kind of product is it?</h2>
                        <h3>Help us figure out where it fits on our site, just choose what you think is right.</h3>
                        <label>
                            <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value={'Art'}>Art</option>
                                <option value={'Art Supplies'}>Art Supplies</option>
                                <option value={'Electronics'}>Electronics</option>
                                <option value={'Clothes'}>Clothes</option>
                                <option value={'Jewelry'}>Jewelry</option>
                                <option value={'Pet Supplies'}>Pet Supplies</option>
                                <option value='' disabled>&#40;select one&#41;</option>
                            </select>
                        </label>
                        {submitted && <div className='errors'>{errors.category}</div>}
                    </div>
                </div>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <h2>How will you handle returns?</h2>
                        <h3>Not everybody will love your stuff but, don&#39;t worry, we will.</h3>
                        <label>
                            <input
                            type="text"
                            placeholder='Returns?'
                            value={return_policy}
                            onChange={(e) => setReturn_policy(e.target.value)}
                            />
                        </label>
                        {submitted && <div className='errors'>{errors.return_policy}</div>}
                    </div>
                </div>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <h2>Do you want to offer free shipping?</h2>
                        <h3>We don&#39;t blame you if not.</h3>
                        <label>
                            <input
                            type="radio"
                            value={true}
                            name="free_shipping"
                            defaultChecked={free_shipping == true}
                            onChange={() => setFree_shipping(true)}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                            type="radio"
                            value={false}
                            name="free_shipping"
                            defaultChecked={free_shipping == false}
                            onChange={() => setFree_shipping(false)}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <h2>How many days do you think it will take to reach the customer?</h2>
                        <label>
                            <input
                            type="number"
                            min="0"
                            step="1"
                            placeholder='0'
                            value={shipping_time}
                            onChange={(e) => setShipping_time(e.target.value)}
                            />
                        </label>
                        {submitted && <div className='errors'>{errors.shipping_time}</div>}
                    </div>
                </div>
                <div>
                    <button disabled={disabled} id='product-form-submit' type="submit">{formType}</button>
                </div>
            </div>
        </form>
    );
};

export default ProductForm
