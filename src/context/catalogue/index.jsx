import { createContext, useContext } from "react";

const CatalogueContext = createContext();
CatalogueContext.displayName = "CatalogueContext";

const useCatalogueContext = () => useContext(CatalogueContext);

const CatalogueContextProvider = ({ catalogueData, children }) => {
  return (
    <CatalogueContext.Provider value={{ catalogueData }}>
      {children}
    </CatalogueContext.Provider>
  );
};

export { CatalogueContext, useCatalogueContext, CatalogueContextProvider };
