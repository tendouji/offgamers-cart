import { createContext, useContext, useState } from "react";

const SearchPanelContext = createContext();
SearchPanelContext.displayName = "SearchPanelContext";

const useSearchPanelContext = () => useContext(SearchPanelContext);

const searchPanelInitialState = {
  searchKey: "",
  showSearchPanel: false,
};

const SearchPanelContextProvider = ({ children }) => {
  const [searchKey, setSearchKey] = useState(searchPanelInitialState.searchKey);
  const [showSearchPanel, showHideSearchPanel] = useState(
    searchPanelInitialState.showSearchPanel
  );

  return (
    <SearchPanelContext.Provider
      value={{
        searchKey,
        setSearchKey,
        showSearchPanel,
        showHideSearchPanel,
      }}
    >
      {children}
    </SearchPanelContext.Provider>
  );
};

export {
  SearchPanelContext,
  useSearchPanelContext,
  SearchPanelContextProvider,
};
