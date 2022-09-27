const axios = require("axios").default;

export const getRelevantGifs = async (text) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/getRelevantGifs`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { text },
  }).catch((err) => {
    console.log(err);
  });
};
