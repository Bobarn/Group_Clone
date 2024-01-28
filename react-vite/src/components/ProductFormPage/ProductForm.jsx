import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateProduct, thunkUpdateProduct } from '../../redux/product';
import './ProductForm.css'

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
    const [secondImage, setSecondImage] = useState('')
    const [thirdImage, setThirdImage] = useState('')
    const [disabled, setDisabled] = useState(false);
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setDisabled(true)

        setSubmitted(true)
        price = parseFloat(price)

        shipping_time = parseInt(shipping_time)

        product = { name, description, price, category, shipping_time, return_policy, free_shipping};

        if(Object.values(errors).length) {
            product.errors = errors;
        }


        if(formType === 'Create Product' && !product.errors) {
            // console.log(product)
            let imageInput = [image]
            if(secondImage) {
                imageInput = [image, secondImage]
                if(thirdImage) {
                    imageInput = [image, secondImage, thirdImage]
                }
            }

            if(thirdImage && !secondImage) {
                imageInput = [image, thirdImage]
            }
            product = await dispatch(thunkCreateProduct(product, imageInput));
            // console.log(product)

        } else if (formType === "Update Product" && !product.errors) {
            // console.log(product)
            // console.log(productId)
            product = await dispatch(thunkUpdateProduct(productId, product))
            // console.log("after thunk", product)
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
        if(formType == "Create Product" && !image) {
            newErrors.image = "Image is required"
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
                <h2 className='form-text'>Post Your Wares</h2>
                <h5 className='form-text'>You&#39;re just a few steps away from the start of your store!</h5>
            </div> :
            <div id='product-form-heading'>
                <h2 className='form-text'>Making changes?</h2>
                <h5 className='form-text'>Get them back on the web quick!</h5>
            </div>}

            <div id='product-form-input-area'>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                    <div className='input-name'>
                        <h2 className='form-text'>What will you name your product?</h2>
                    </div>
                        <label className="product-input">
                            <input
                            maxLength={50}
                            id='product-name-input'
                            type="text"
                            value={name}
                            placeholder='Something to stand out!'
                            onChange={(e) => setName(e.target.value)}
                            />
                        {submitted && <div className='errors'>{errors.name}</div>}
                        </label>
                    </div>
                </div>
                {formType == "Create Product" &&
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <div className='input-name'>
                            <h2 className='form-text'>What does it look like?</h2>
                            <h3 className='form-text'>Share a picture with us!</h3>
                        </div>
                        <label className="product-input">
                            Preview Image:
                            <input
                            id='image-input'
                            type="text"
                            value={image}
                            placeholder="Spooky? Pretty? Cool? What's your aesthetic?"
                            onChange={(e) => setImage(e.target.value)}
                            />
                        {submitted && <div className='errors'>{errors.image}</div>}
                        </label>
                        <div>
                        </div>
                        <label className="product-input">
                            Second Image (Optional):
                            <input
                            id='image-input'
                            type="text"
                            value={secondImage}
                            placeholder="Spooky? Pretty? Cool? What's your aesthetic?"
                            onChange={(e) => setSecondImage(e.target.value)}
                            />
                        {submitted && <div className='errors'>{errors.image}</div>}
                        </label>
                        <div>
                        </div>
                        <label className="product-input">
                            Third Image (Optional):
                            <input
                            id='image-input'
                            type="text"
                            value={thirdImage}
                            placeholder="Spooky? Pretty? Cool? What's your aesthetic?"
                            onChange={(e) => setThirdImage(e.target.value)}
                            />
                        {submitted && <div className='errors'>{errors.image}</div>}
                        </label>
                    </div>
                </div>
                }
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <div className='input-name'>
                            <h2 className='form-text'>How would you describe your product?</h2>
                            <h3 className='form-text'>Tell us what you find neat about.</h3>
                        </div>

                        <label className="product-input">
                            <textarea
                            maxLength={1000}
                            id='description-input'
                            placeholder='We love it already.'
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        {submitted && <div className='errors'>{errors.description}</div>}
                        </label>
                    </div>
                </div>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                    <div className='input-name'>
                        <h2 className='form-text'>How much will it cost?</h2>
                    </div>

                        <label className="product-input">
                            <input
                            id='cost-input'
                            type="number"
                            min="0.01"
                            step="0.01"
                            placeholder='$0'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            />
                        {submitted && <div className='errors'>{errors.price}</div>}
                        </label>
                    </div>
                </div>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                    <div className='input-name'>
                        <h2 className='form-text'>What kind of product is it?</h2>
                        <h3 className='form-text'>Help us figure out where it fits on our site, just choose what you think is right.</h3>
                    </div>
                        <label className="product-input">
                            <select
                            id='category-input'
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
                        {submitted && <div className='errors'>{errors.category}</div>}
                        </label>
                    </div>
                </div>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                    <div className='input-name'>
                        <h2 className='form-text'>How will you handle returns?</h2>
                        <h3 className='form-text'>Not everybody will love your stuff but, don&#39;t worry, we will.</h3>
                    </div>
                        <label className="product-input">
                            <textarea id='returns-policy-input'
                            type="text"
                            size={200}
                            maxLength={200}
                            placeholder='Returns?'
                            value={return_policy}
                            onChange={(e) => setReturn_policy(e.target.value)}
                            />
                        {submitted && <div className='errors'>{errors.return_policy}</div>}
                        </label>
                    </div>
                </div>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                        <div className='input-name'>
                            <h2 className='form-text'>Do you want to offer free shipping?</h2>
                            <h3 className='form-text'>We don&#39;t blame you if not.</h3>

                        </div>
                        <div className='input-radio'>
                            <label className="product-input-shipping">
                                <input
                                className='radio-button'
                                type="radio"
                                value={true}
                                name="free_shipping"
                                defaultChecked={free_shipping == true}
                                onChange={() => setFree_shipping(true)}
                                />
                                Yes
                            </label>
                            <label className="product-input-shipping">
                                <input
                                className='radio-button'
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
                </div>
                <div className={'product-form-input'}>
                    <div className={'product-form-restraint'}>
                    <div className='input-name'>
                        <h2 className='form-text'>How many days do you think it will take to reach the customer?</h2>
                    </div>
                        <label className="product-input">
                            <input
                            id='days-input'
                            type="number"
                            min="0"
                            max={"365"}
                            step="1"
                            placeholder='0'
                            value={shipping_time}
                            onChange={(e) => setShipping_time(e.target.value)}
                            />
                        {submitted && <div className='errors'>{errors.shipping_time}</div>}
                        </label>
                    </div>
                </div>
                <div id='submit-area'>
                    <button disabled={disabled} className='form-text' id='product-form-submit' type="submit">{formType}</button>
                </div>
            </div>
        </form>
    );
};

export default ProductForm
