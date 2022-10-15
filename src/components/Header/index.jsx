import React from "react";
import { useCartContext } from "../../context/Cart";
import { useSearchPanelContext } from "../../context/SearchPanel";
import MiniCart from "../MiniCart";

const Header = ({ globalStates }) => {
  const { cartContent, showMiniCart, showHideMiniCart } = useCartContext();
  const { showSearchPanel, showHideSearchPanel } = useSearchPanelContext();

  const getTotalCartItems = () => {
    return cartContent.reduce((a, b) => a + (b["quantity"] || 0), 0);
  };

  const onShowHideCart = (e) => {
    e.preventDefault();
    showHideSearchPanel(false);
    showHideMiniCart(!showMiniCart);
  };

  const onShowHideSearchPanel = (e) => {
    e.preventDefault();
    showHideMiniCart(false);
    showHideSearchPanel(!showSearchPanel);
  };

  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__title">
          <div className="header__title__logo">
            <span className="material-symbols-outlined">smart_toy</span>
          </div>
          <h1>OffGamers Catalogue</h1>
        </div>
        <button
          type="button"
          className={[
            "header__search-button",
            !!showSearchPanel ? " highlighted" : "",
          ].join("")}
          onClick={onShowHideSearchPanel}
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        <button
          type="button"
          className={[
            "header__cart-button",
            !!showMiniCart ? " highlighted" : "",
          ].join("")}
          onClick={onShowHideCart}
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          {getTotalCartItems() > 0 && (
            <span className="header__cart-button__counter-badge">
              {getTotalCartItems() || 0}
            </span>
          )}
        </button>
        {showMiniCart && <MiniCart></MiniCart>}
      </div>
    </header>
  );
};

export default Header;
