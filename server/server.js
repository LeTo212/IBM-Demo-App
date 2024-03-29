const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const axios = require("axios").default;

const API_KEY_WATSON_NLU = "vwPLAEce1W7w7vYEzXbqlf-Mge_loZE9Yf7pDZlpDKoB";
const API_KEY_GIPHY = "XARqrm0gCp2248viPSXkM3X6hywv8mSy";

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Start server
const server = app.listen(3333, () => {
  const port = server.address().port;
  console.log("Listening on port " + port);
});

// Connecting Natural Language Understanding service
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2022-04-07",
  authenticator: new IamAuthenticator({
    apikey: API_KEY_WATSON_NLU,
  }),
  serviceUrl:
    "https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/instances/6c94ff95-22cc-4c85-bfb7-d6f55e1f3522/v1/analyze?version=2022-04-07",
});

///////////////////////////////////////////////////////////////
//////////////////////// Endpoints ////////////////////////////
///////////////////////////////////////////////////////////////

app.post("/api/getRelevantGifs", (req, res) => {
  const userText = req.body.text;
  const giphy = (searchQuery) => {
    axios({
      method: "get",
      url: `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${API_KEY_GIPHY}&limit=10`,
    })
      .then((response) => res.status(200).json(response.data))
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  };

  if (
    userText &&
    (typeof userText === "string" || userText instanceof String) &&
    userText.length <= 10000
  )
    naturalLanguageUnderstanding
      .analyze({
        features: {
          keywords: {
            limit: 1,
          },
        },
        text: userText,
      })
      .then((analysisResults) => {
        const keyword = analysisResults.result.keywords[0].text;

        keyword
          ? giphy(keyword)
          : res.status(400).json({
              msg: "Invalid request",
            });
      })
      .catch((err) => {
        if (
          err.status === 422 &&
          JSON.parse(err.body).error === "not enough text for language id"
        )
          giphy(userText);
        else {
          console.log(err);
          res.status(500).send();
        }
      });
  else
    res.status(400).json({
      msg: "Invalid request",
    });
});
