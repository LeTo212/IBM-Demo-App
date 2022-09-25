import { useState } from "react";
import "./App.css";
import GifsList from "./components/GifsList";
import Error from "./components/Error";

const axios = require("axios").default;

function App() {
  const [text, setText] = useState("");
  const [gifs, setGifs] = useState([]);
  const [err, setErr] = useState(false);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (text.length === 0 || text.length > 10000) {
      setErr(true);
      return;
    }

    const apiCall = async () => {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/api/getRelevantGif`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { text },
      }).catch((err) => {
        console.log(err);
      });

      setGifs(res.data.data);
    };

    apiCall();

    setText("");
    setErr(false);
  };

  return (
    <div className="App">
      <h1>IBM Demo App</h1>
      <h3>Type text into the form and hit submit</h3>
      <input className="input-field" value={text} onChange={handleInput} />
      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
      <Error
        isError={err}
        text="Please enter a text with min. 1 char and max. 10 000 chars"
      />
      {gifs && <GifsList gifs={gifs} />}
    </div>
  );
}

export default App;
