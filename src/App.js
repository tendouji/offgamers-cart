import axios from "axios";
import { useEffect, useState } from "react";
import { CatalogueContextProvider } from "./context/Catalogue";
import { CartContextProvider } from "./context/Cart";
import { SearchPanelContextProvider } from "./context/SearchPanel";
import Header from "./components/Header";
import Content from "./components/Content";
import Preloader from "./components/Preloader";

const App = () => {
  const [catalogueData, setCatalogueData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mapCatalogueData = (catalogueList) =>
    catalogueList.map((catalogueItem, index) => ({
      ...catalogueItem,
      id: `${Date.now()}-${index}`,
    }));

  useEffect(() => {
    const getData = () => {
      axios({
        url: "/api/offgamers/catalogue",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then((response) => {
          const { data } = response;
          if (data && data.success) {
            const { data: catalogueList } = data;
            setCatalogueData(mapCatalogueData(catalogueList));
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    if (!catalogueData.length) {
      getData();
    }
  }, [catalogueData.length]);

  return (
    <CatalogueContextProvider catalogueData={catalogueData}>
      <CartContextProvider>
        <SearchPanelContextProvider>
          <div className="cart-site">
            <Header></Header>
            <Content isLoading={isLoading}></Content>
          </div>
          {!!isLoading && <Preloader></Preloader>}
        </SearchPanelContextProvider>
      </CartContextProvider>
    </CatalogueContextProvider>
  );
};

export default App;
