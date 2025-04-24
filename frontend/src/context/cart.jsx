import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  total: 0,
  quantity: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const saveLocalStorage = (items, total, quantity) => {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        items,
        total,
        quantity,
      })
    );
  };

  const addToCart = (product) => {
    const cartProduct = cartItems.find(
      (cartItem) => cartItem._id === product._id
    );

    if (cartProduct) {
      // Se o produto existe
      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === cartProduct._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        } else {
          return cartItem;
        }
      });
      const cartValues = newCartItems.reduce(
        (prev, curr) => ({
          totalPrice: curr.price * curr.quantity + prev.totalPrice,
          quantity: curr.quantity + prev.quantity,
        }),
        {
          quantity: 0,
          totalPrice: 0,
        }
      );
      setTotal(cartValues.totalPrice);
      setQuantity(cartValues.quantity);
      setCartItems(newCartItems);
      saveLocalStorage(
        newCartItems,
        cartValues.totalPrice,
        cartValues.quantity
      );
    } else {
      // Se o produto não existe
      setQuantity(quantity + 1);
      setTotal(total + product.price);
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      saveLocalStorage(
        [...cartItems, { ...product, quantity: 1 }],
        total + product.price,
        quantity + 1
      );
    }
  };
  const removeFromCart = () => {};

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
    setQuantity(0);
    saveLocalStorage([], 0, 0);
  };

  useEffect(() => {
    const storageCart = localStorage.getItem("cart");

    if (storageCart) {
      const cartObj = JSON.parse(storageCart);
      setCartItems(cartObj.items);
      setQuantity(cartObj.quantity);
      setTotal(cartObj.total);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        quantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
