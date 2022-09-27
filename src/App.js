import { useState } from "react";
import { SearchBar, GifsList } from "./components";
import { getRelevantGifs } from "./api/gifs";
import "./App.css";

function App() {
  const [gifs, setGifs] = useState([]);

  const handleSearch = async (text) => {
    const res = await getRelevantGifs(text);

    setGifs(res.data.data);
  };

  return (
    <div className="App">
      <h1>IBM Demo App</h1>
      <h3>Type text into the form and press search button</h3>
      <SearchBar handler={handleSearch} />
      {gifs && <GifsList gifs={gifs} />}
    </div>
  );
}

export default App;
