import { useState, useEffect } from "react";
import { Error } from "..";
import "./SearchBar.css";

const SearchBar = ({ handler }) => {
  const [text, setText] = useState("");
  const [err, setErr] = useState(false);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("recent"));
    setRecent(res ? res : []);
  }, []);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (text.length === 0 || text.length > 10000) {
      setErr(true);
      return;
    }

    let tmp = recent;
    const index = tmp.indexOf(text);

    if (index !== -1) tmp.splice(index, 1);
    tmp.push(text);
    tmp = tmp.slice(-5);

    localStorage.setItem("recent", JSON.stringify(tmp));
    setRecent(tmp);
    setErr(false);

    handler(text);
  };

  const HistoryItem = ({ item }) => (
    <div
      className="search-bar-history-item"
      onClick={() => setText(item)}
      onMouseDown={(e) => e.preventDefault()}
    >
      {item}
    </div>
  );

  const HistoryList = () => {
    const items = recent
      .map((itemData) => {
        return <HistoryItem key={itemData} item={itemData} />;
      })
      .reverse();
    return <div className="search-bar-history">{items}</div>;
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          className="search-bar-input"
          value={text}
          onChange={handleInput}
        />
        <button className="search-bar-btn" onClick={handleSubmit}>
          Search
        </button>
        {recent && <HistoryList />}
        <Error
          isError={err}
          text="Please enter a text with min. 1 char and max. 10 000 chars"
        />
      </div>
    </div>
  );
};

export default SearchBar;
