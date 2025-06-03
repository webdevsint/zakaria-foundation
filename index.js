const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./views/index.html"));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.resolve("./views/404.html"));
});

app.listen(5000, () => console.log("Server started on http://localhost:5000/"));
