import axios from "axios";
import { useEffect, useState } from "react";
import { CatalogueContextProvider } from "./context/catalogue";
import { CartContextProvider } from "./context/cart";
import Header from "./components/Header";
import Content from "./components/Content";

const App = () => {
  const [catalogueData, setCatalogueData] = useState([]);

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
        })
        .catch((error) => {
          // FIXME add error handling
          console.log(error);
        });
    };

    if (!catalogueData.length) {
      getData();
    }
  }, []);

  return (
    <CatalogueContextProvider catalogueData={catalogueData}>
      <CartContextProvider>
        <div className="cart-site">
          <Header></Header>
          <Content></Content>
        </div>
      </CartContextProvider>
    </CatalogueContextProvider>
  );
};

export default App;
