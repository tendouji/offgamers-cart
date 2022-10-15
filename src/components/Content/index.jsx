import React from "react";
import { useCartContext } from "../../context/Cart";
import { useCatalogueContext } from "../../context/Catalogue";
import { useSearchPanelContext } from "../../context/SearchPanel";
import SearchPanel from "../SearchPanel";

const Content = ({ isLoading }) => {
  const { catalogueData } = useCatalogueContext();
  const { searchKey, showSearchPanel } = useSearchPanelContext();
  const { addItem } = useCartContext();

  const onButtonClick = (e) => {
    e.preventDefault();
    const { itemId } = e.target.dataset;
    addItem(itemId);
  };

  const matchSearchKey = (title) => {
    if (!searchKey) {
      return true;
    }
    return title.toLowerCase().includes(searchKey.toLowerCase());
  };

  return (
    !isLoading && (
      <main
        className={["content", !!showSearchPanel ? " display-search" : ""].join(
          ""
        )}
      >
        <SearchPanel></SearchPanel>
        <div className="catalogue wrapper">
          {!!catalogueData && catalogueData.length ? (
            catalogueData.map((item) => (
              <div
                key={item.id}
                className={[
                  "catalogue__item",
                  !matchSearchKey(item.name) ? " hidden" : "",
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
            ))
          ) : (
            <div className="error-message">No content available</div>
          )}
        </div>
      </main>
    )
  );
};

export default Content;
