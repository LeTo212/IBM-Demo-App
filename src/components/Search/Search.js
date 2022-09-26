import "./Search.css";
import { Provider, History, Trigger } from "react-history-search";

const Search = ({ handler }) => {
  return (
    <Provider
      value={{
        handleSearch: handler,
        isEnterDown: false,
        limitHistory: 5,
      }}
    >
      <History isHint isTabFill isRemoveHistory>
        <input id="search" />
      </History>

      <Trigger dataId="search">
        <button>Search</button>
      </Trigger>
    </Provider>
  );
};

export default Search;
