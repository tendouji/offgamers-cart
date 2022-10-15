import React, { useState } from "react";
import { useSearchPanelContext } from "../../context/SearchPanel";

const SearchPanel = () => {
  const [currentSearchKey, setCurrentSearchKey] = useState("");
  const { setSearchKey } = useSearchPanelContext();

  const onSearchChange = (e) => {
    setCurrentSearchKey(e.currentTarget.value);
  };

  const onSearchKeyUp = (e) => {
    const keyCode = e.keyCode || e.which;
    if (!!keyCode) {
      if (keyCode === 13) {
        setSearchKey(e.currentTarget.value);
      }
    } else {
      if (e.key === "Enter") {
        setSearchKey(e.currentTarget.value);
      }
    }
  };

  const onSearchClick = (e) => {
    setSearchKey(e.currentTarget.value);
  };

  return (
    <div className="search-panel">
      <div className="wrapper">
        <input
          type="text"
          placeholder="Search product"
          value={currentSearchKey}
          onChange={onSearchChange}
          onKeyUp={onSearchKeyUp}
        />
        <button type="button" onClick={onSearchClick}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;
