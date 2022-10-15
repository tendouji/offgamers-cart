import { createContext, useContext, useState } from "react";
import { useCatalogueContext } from "../catalogue";

const CartContext = createContext();
CartContext.displayName = "CartContext";

const useCartContext = () => useContext(CartContext);

const cartInitialState = [];

const CartContextProvider = ({ children }) => {
  const { catalogueData } = useCatalogueContext();
  const [cartContent, setCartContent] = useState(cartInitialState);

  const findItemIndexInCartList = (itemId) => {
    if (!cartContent.length) {
      return -1;
    }
    return cartContent.findIndex((cartItem) => cartItem.id === itemId);
  };

  const getCatalogueItemById = (itemId) => {
    const targetItem = catalogueData.find(
      (catalogueItem) => catalogueItem.id === itemId
    );
    return targetItem;
  };

  const addItem = (itemId) => {
    const catalogueItem = getCatalogueItemById(itemId);
    if (!catalogueItem) {
      return;
    }

    const targetCartItemIndex = findItemIndexInCartList(itemId);
    let newCartContent = [];

    if (targetCartItemIndex !== -1) {
      newCartContent = [...cartContent];
      const targetItem = newCartContent[targetCartItemIndex];
      targetItem.quantity += 1;
    } else {
      newCartContent = [
        ...cartContent,
        {
          id: itemId,
          itemData: catalogueItem,
          quantity: 1,
        },
      ];
    }
    setCartContent(newCartContent);
  };

  const removeItem = (item) => {
    console.log("removeItem");
  };

  return (
    <CartContext.Provider
      value={{
        cartContent,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, useCartContext, CartContextProvider };
