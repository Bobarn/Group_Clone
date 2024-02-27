import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkCreateProduct, thunkUpdateProduct } from "../../redux/product";
import "./ProductForm.css";

const ProductForm = ({ product, formType, productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(product?.name);
  const [description, setDescription] = useState(product?.description);
  let [price, setPrice] = useState(product?.price);
  const [category, setCategory] = useState(product?.category);
  const [free_shipping, setFree_shipping] = useState(product?.free_shipping);
  const [return_policy, setReturn_policy] = useState(product?.return_policy);
  let [shipping_time, setShipping_time] = useState(product?.shipping_time);
  const [image, setImage] = useState(product?.preview_image);
  const [secondImage, setSecondImage] = useState(product?.images[1] ? product?.images[1] : "");
  const [thirdImage, setThirdImage] = useState(product?.images[2] ? product?.images[2] : "");
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("IN HERE")



        setDisabled(true)

        setSubmitted(true)
        price = parseFloat(price)

        shipping_time = parseInt(shipping_time)

        const form = new FormData();

        form.append("name", name);
        form.append("description", description);
        form.append("price", price);
        form.append("category", category);
        form.append("shipping_time", shipping_time);
        form.append("return_policy", return_policy);
        form.append("free_shipping", free_shipping);

        // product = { name, description, price, category, shipping_time, return_policy, free_shipping};

        if(Object.values(errors).length) {
            product.errors = errors;
        }


        if(formType === 'Create Product' && !product.errors) {
          setLoading(true)
            // console.log(product)
            let image1 = new FormData();
            image1.append("url", image);
            let imageInput = [image1]
            if(secondImage) {
              let image2 = new FormData();
              image2.append("url", secondImage);
                imageInput = [image1, image2]
                if(thirdImage) {
                    let image3 = new FormData();
                    image3.append("url", thirdImage);
                    imageInput = [image1, image2, image3]
                }
            }

            if(thirdImage && !secondImage) {
                let image3 = new FormData();
                image3.append("url", thirdImage);
                imageInput = [image, image3]
            }
            product = await dispatch(thunkCreateProduct(form, imageInput));
            // console.log(product)

        } else if (formType === "Update Product" && !product.errors) {
          setLoading(true)
            // console.log(product)
            // console.log(productId)
            product = await dispatch(thunkUpdateProduct(productId, form))
            // console.log("after thunk", product)
          } else{

            setDisabled(false)

            return null;
          }

          if(product.errors) {

            setErrors(product.errors);

            setDisabled(false)
          } else {
            setLoading(false)

            navigate(`/products/${product.product.id}`)
        }
    };

  useEffect(() => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (formType == "Create Product" && !image) {
      newErrors.image = "Image is required";
    }
    if (!category) {
      newErrors.category = "Category is required";
    }
    if (!return_policy) {
      newErrors.return_policy = "This product needs a return policy";
    }
    if (!price) {
      newErrors.price = "A price is required";
    }
    if (!shipping_time) {
      newErrors.shipping_time = "Estimated shipping time is required";
    }

    setErrors(newErrors);
  }, [
    submitted,
    name,
    description,
    category,
    return_policy,
    price,
    shipping_time,
  ]);

  return (
  <div id="form-container">
    <form id="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
      {formType === "Create Product" ? (
        <div id="product-form-heading">
          <h2 className="form-text">Post Your Wares</h2>
          <h5 className="form-text">
            You&#39;re just a few steps away from the start of your store!
          </h5>
        </div>
      ) : (
        <div id="product-form-heading">
          <h2 className="form-text">Making changes?</h2>
          <h5 className="form-text">Get them back on the web quick!</h5>
        </div>
      )}

      <div id="product-form-input-area">
        <div className={"product-form-input"}>
          <div className={"product-form-restraint"}>
            <div className="input-name">
              <h2 className="form-text">What will you name your product?</h2>
            </div>
            <label className="product-input">
              <input
                maxLength={50}
                id="product-name-input"
                type="text"
                value={name}
                placeholder="Something to stand out!"
                onChange={(e) => setName(e.target.value)}
              />
              {submitted && <div className="errors">{errors.name}</div>}
            </label>
          </div>
        </div>
        {formType == "Create Product" && (
          <div className={"product-form-input"}>
            <div className={"product-form-restraint"}>
              <div className="input-name">
                <h2 className="form-text">What does it look like?</h2>
                <h3 className="form-text">Share a picture with us!</h3>
              </div>
              <label className="product-input">
                Preview Image:
                {/* <input
                  id="image-input"
                  type="text"
                  value={image}
                  placeholder="Spooky? Pretty? Cool? What's your aesthetic?"
                  onChange={(e) => setImage(e.target.value)}
                /> */}
                <input
                id='image-input'
                // value={image}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setImage(e.target.files[0])}>

                </input>
                <p>Spooky? Pretty? Cool? What&#39;s your aesthetic?</p>
                {/* {image && (
                  <img
                    src={image}
                    alt="Preview"
                    onError={(e) =>
                      (e.target.src =
                        "data:image/png;base64,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")
                    }
                  />
                )} */}
                {submitted && <div className="errors">{errors.image}</div>}
              </label>
              <div></div>
              <label className="product-input">
                Second Image (Optional):
                <input
                  id="image-input"
                  // value={secondImage}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => setSecondImage(e.target.files[0])}
                />
              </label>
              <div></div>
              <label className="product-input">
                Third Image (Optional):
                <input
                  id="image-input"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  // value={thirdImage}
                  onChange={(e) => setThirdImage(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        )}
        <div className={"product-form-input"}>
          <div className={"product-form-restraint"}>
            <div className="input-name">
              <h2 className="form-text">
                How would you describe your product?
              </h2>
              <h3 className="form-text">Tell us what you find neat about.</h3>
            </div>

            <label className="product-input">
              <textarea
                maxLength={1000}
                id="description-input"
                placeholder="We love it already."
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {submitted && <div className="errors">{errors.description}</div>}
            </label>
          </div>
        </div>
        <div className={"product-form-input"}>
          <div className={"product-form-restraint"}>
            <div className="input-name">
              <h2 className="form-text">How much will it cost?</h2>
            </div>

            <label className="product-input">
              <input
                id="cost-input"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="$0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {submitted && <div className="errors">{errors.price}</div>}
            </label>
          </div>
        </div>
        <div className={"product-form-input"}>
          <div className={"product-form-restraint"}>
            <div className="input-name">
              <h2 className="form-text">What kind of product is it?</h2>
              <h3 className="form-text">
                Help us figure out where it fits on our site, just choose what
                you think is right.
              </h3>
            </div>
            <label className="product-input">
              <select
                id="category-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={"Art"}>Art</option>
                <option value={"Art Supplies"}>Art Supplies</option>
                <option value={"Electronics"}>Electronics</option>
                <option value={"Clothes"}>Clothes</option>
                <option value={"Jewelry"}>Jewelry</option>
                <option value={"Pet Supplies"}>Pet Supplies</option>
                <option value="" disabled>
                  &#40;select one&#41;
                </option>
              </select>
              {submitted && <div className="errors">{errors.category}</div>}
            </label>
          </div>
        </div>
        <div className={"product-form-input"}>
          <div className={"product-form-restraint"}>
            <div className="input-name">
              <h2 className="form-text">How will you handle returns?</h2>
              <h3 className="form-text">
                Not everybody will love your stuff but, don&#39;t worry, we
                will.
              </h3>
            </div>
            <label className="product-input">
              <textarea
                id="returns-policy-input"
                type="text"
                size={200}
                maxLength={200}
                placeholder="Returns?"
                value={return_policy}
                onChange={(e) => setReturn_policy(e.target.value)}
              />
              {submitted && (
                <div className="errors">{errors.return_policy}</div>
              )}
            </label>
          </div>
        </div>
        <div className={"product-form-input"}>
          <div className={"product-form-restraint"}>
            <div className="input-name">
              <h2 className="form-text">Do you want to offer free shipping?</h2>
              <h3 className="form-text">We don&#39;t blame you if not.</h3>
            </div>
            <div className="input-radio">
              <label className="product-input-shipping">
                <input
                  className="radio-button"
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
                  className="radio-button"
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
        <div className={"product-form-input"}>
          <div className={"product-form-restraint"}>
            <div className="input-name">
              <h2 className="form-text">
                How many days do you think it will take to reach the customer?
              </h2>
            </div>
            <label className="product-input">
              <input
                id="days-input"
                type="number"
                min="0"
                max={"365"}
                step="1"
                placeholder="0"
                value={shipping_time}
                onChange={(e) => setShipping_time(e.target.value)}
              />
              {submitted && (
                <div className="errors">{errors.shipping_time}</div>
              )}
            </label>
          </div>
        </div>
        <div id="submit-area">
          <button
            disabled={disabled}
            className="form-text"
            id="product-form-submit"
            type="submit"
          >
            {formType}
          </button>
        </div>
      </div>
    </form>
    {loading && <><div className="loader"></div><div className="loader-text">Loading...</div></>}
  </div>
  );
};

export default ProductForm;
