const express = require("express");
const app = express();

app.get("/", (rez, res) => {
  res.send({ hi: "there" });
});

app.listen(5000);
