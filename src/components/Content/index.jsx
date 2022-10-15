import React from "react";
import { useCartContext } from "../../context/cart";
import { useCatalogueContext } from "../../context/catalogue";

const Content = () => {
  const { catalogueData } = useCatalogueContext();
  const { addItem } = useCartContext();

  const onButtonClick = (e) => {
    e.preventDefault();
    const { itemId } = e.target.dataset;
    addItem(itemId);
  };

  return (
    <main className="content">
      <div className="catalogue wrapper">
        {catalogueData &&
          catalogueData.map((item) => (
            <div
              key={item.id}
              className={[
                "catalogue__item",
                !item.quantity ? " catalogue__item--out-of-stock" : "",
              ].join("")}
            >
              <div className="catalogue__item__info">
                <div className="catalogue__item__image">
                  <div className="catalogue__item__image__wrapper">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
                <div className="catalogue__item__title">{item.name}</div>
                <div className="catalogue__item__price">
                  <div className="catalogue__item__price__discounted-price">
                    {item.currency} {item.final_price}
                  </div>
                  <div className="catalogue__item__price__selling-price">
                    {item.currency} {item.price}
                  </div>
                </div>
              </div>
              <div className="catalogue__item__action">
                <button
                  type="button"
                  data-item-id={item.id}
                  {...(item.quantity > 0 && { onClick: onButtonClick })}
                  {...(!item.quantity && { disabled: true })}
                >
                  {!item.quantity ? "Out of stock" : "Buy"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Content;
