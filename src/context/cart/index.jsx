import { createContext, useContext, useReducer, useState } from "react";
import { useCatalogueContext } from "../Catalogue";

const CartContext = createContext();
CartContext.displayName = "CartContext";

const useCartContext = () => useContext(CartContext);

const cartInitialState = {
  cartItems: [],
  showMiniCart: false,
};

const cartActionType = {
  ADD: "add",
  MINUS: "minus",
  REMOVE: "remove",
};

const CartContextProvider = ({ children }) => {
  const { catalogueData } = useCatalogueContext();

  const cartContentReducer = (state, action) => {
    const itemId = action.id;
    const currentCartContent = state;

    const getCatalogueItemById = () => {
      const targetItem = catalogueData.find(
        (catalogueItem) => catalogueItem.id === itemId
      );
      return targetItem;
    };

    const deepCloneCartContent = () =>
      JSON.parse(JSON.stringify(currentCartContent));

    const catalogueItem = getCatalogueItemById();
    if (!catalogueItem) {
      return;
    }

    const targetCartItemIndex = currentCartContent.findIndex(
      (cartItem) => cartItem.id === itemId
    );
    let targetItem = {};
    let newCartContent = [];

    switch (action.type) {
      case cartActionType.ADD:
        if (targetCartItemIndex !== -1) {
          newCartContent = deepCloneCartContent();
          newCartContent[targetCartItemIndex].quantity++;
        } else {
          newCartContent = [
            ...currentCartContent,
            {
              id: itemId,
              itemData: catalogueItem,
              quantity: 1,
            },
          ];
        }
        return newCartContent;
      case cartActionType.MINUS:
        if (targetCartItemIndex === -1) {
          return state;
        }

        newCartContent = deepCloneCartContent();
        targetItem = newCartContent[targetCartItemIndex];
        if (targetItem.quantity - 1 === 0) {
          newCartContent.splice(targetCartItemIndex, 1);
        } else {
          targetItem.quantity--;
        }
        return newCartContent;
      case cartActionType.REMOVE:
        if (targetCartItemIndex === -1) {
          return state;
        }

        newCartContent = deepCloneCartContent();
        newCartContent.splice(targetCartItemIndex, 1);
        return newCartContent;
      default:
        return state;
    }
  };

  const [cartContent, setCartContent] = useReducer(
    cartContentReducer,
    cartInitialState.cartItems
  );
  const [showMiniCart, showHideMiniCart] = useState(
    cartInitialState.showMiniCart
  );

  const addItem = (itemId) => {
    setCartContent({ type: cartActionType.ADD, id: itemId });
  };

  const minusItem = (itemId) => {
    setCartContent({ type: cartActionType.MINUS, id: itemId });
  };

  const removeItem = (itemId) => {
    setCartContent({ type: cartActionType.REMOVE, id: itemId });
  };

  return (
    <CartContext.Provider
      value={{
        cartContent,
        addItem,
        minusItem,
        removeItem,
        showMiniCart,
        showHideMiniCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, useCartContext, CartContextProvider };
