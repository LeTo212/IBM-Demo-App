import { useState } from "react";
import { GifsGallery, LoadingSpinner, SearchBar } from "./components";
import { getRelevantGifs } from "./api/gifs";
import "./App.css";

function App() {
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (text) => {
    setGifs([]);
    setIsLoading(true);

    const res = await getRelevantGifs(text);

    setIsLoading(false);
    setGifs(res.data.data ? res.data.data : []);
  };

  return (
    <div className="App">
      <h1>IBM Demo App</h1>
      <h3>Type text into the form and press search button</h3>
      <SearchBar handler={handleSearch} />
      {isLoading ? <LoadingSpinner /> : null}
      {gifs && <GifsGallery gifs={gifs} />}
    </div>
  );
}

export default App;
