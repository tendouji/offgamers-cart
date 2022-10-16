import React from "react";
import { useCartContext } from "../../context/Cart";

const MiniCart = () => {
  const { cartContent, addItem, minusItem, removeItem } = useCartContext();

  const onAddItem = (e) => {
    const { itemId } = e.currentTarget.dataset;
    addItem(itemId);
  };

  const onMinusItem = (e) => {
    const { itemId } = e.currentTarget.dataset;
    minusItem(itemId);
  };

  const onRemoveItem = (e) => {
    const { itemId } = e.currentTarget.dataset;
    removeItem(itemId);
  };

  return (
    <div className="mini-cart">
      {cartContent && cartContent.length ? (
        <>
          <ul>
            {cartContent.map((item) => (
              <li key={item.id} className="mini-cart__item">
                <div className="mini-cart__item__title">
                  <strong>{item.itemData.name}</strong> × {item.quantity}
                </div>
                <div className="mini-cart__item__buttons">
                  <button type="button" data-item-id={item.id} onClick={onAddItem}>
                    <span className="material-symbols-outlined">exposure_plus_1</span>
                  </button>
                  <button type="button" data-item-id={item.id} onClick={onMinusItem}>
                    <span className="material-symbols-outlined">exposure_neg_1</span>
                  </button>
                  <button type="button" data-item-id={item.id} onClick={onRemoveItem}>
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mini-cart__action">
            <button type="button">Checkout</button>
          </div>
        </>
      ) : (
        <div className="mini-cart__message">
          <span className="material-symbols-outlined">production_quantity_limits</span>
          <span>No items added</span>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
