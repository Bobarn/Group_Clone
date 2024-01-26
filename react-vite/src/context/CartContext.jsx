import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

    const addToCart = (product) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === product.id); // check if the item is already in the cart

        if (isItemInCart) {
        setCartItems(
            cartItems.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
            cartItem.id === product.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem // otherwise, return the cart item
            )
        );
        } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
        }
      };

    const removeFromCart = (product) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === product.id);

    if (isItemInCart.quantity === 1) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== product.id)); // if the quantity of the item is 1, remove the item from the cart
    } else {
        setCartItems(
        cartItems.map((cartItem) =>
            cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 } // if the quantity of the item is greater than 1, decrease the quantity of the item
            : cartItem
        )
        );
    }
    };

    const clearCart = () => {
        setCartItems([]); // set the cart items to an empty array
      };

    const getCartTotal = () => {
        return cartItems.reduce((total, product) => total + product.price * product.quantity, 0); // calculate the total price of the items in the cart
    };

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
        setCartItems(JSON.parse(cartItems));
        }
    }, []);

    return (
        <CartContext.Provider
          value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            getCartTotal,
          }}
        >
          {children}
        </CartContext.Provider>
      );

}
