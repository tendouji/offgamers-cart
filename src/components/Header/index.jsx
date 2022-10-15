import React, { useRef } from "react";
import { useCartContext } from "../../context/cart";
import MiniCart from "../MiniCart";

const Header = ({ globalStates }) => {
  const headerRef = useRef(null);
  const { cartContent, showMiniCart, showHideMiniCart } = useCartContext();

  const getTotalCartItems = () => {
    return cartContent.reduce((a, b) => a + (b["quantity"] || 0), 0);
  };

  const onShowHideCart = (e) => {
    e.preventDefault();
    showHideMiniCart(!showMiniCart);
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="wrapper">
        <div className="header__title">
          <div className="header__title__logo">
            <span className="material-symbols-outlined">smart_toy</span>
          </div>
          <h1>OffGamers Catalogue</h1>
        </div>
        <a href="#cart" className="header__cart-link" onClick={onShowHideCart}>
          <span className="material-symbols-outlined">shopping_cart</span>
          {getTotalCartItems() > 0 && (
            <span className="header__cart-link__counter-badge">
              {getTotalCartItems() || 0}
            </span>
          )}
        </a>
        {showMiniCart && <MiniCart></MiniCart>}
      </div>
    </header>
  );
};

export default Header;
