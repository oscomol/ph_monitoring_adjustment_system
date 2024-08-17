const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3500;

app.use(bodyParser.text());

app.get("/ph", (req, res) => {
  res.status(200).send("Hello world")
})

app.post("/ph", (req, res) => {
  const ph = req.body;

  // Sending the 'ph' value as plain text to the Render server
  const dataApi = process.env.ph;
  axios
    .post(dataApi, ph, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
    .then((response) => {
      console.log("Data sent successfully", response.data);
    })
    .catch((error) => {
      console.error("Error sending data", error);
    });

  res.send("Data received");
});

app.listen(PORT, () => {
  console.log("Server running");
});
