const express = require("express");
const app = express();
const PouchDB = require("pouchdb");
const cors = require("cors");

const port = 4000;

app.use(cors());
app.use("/", express.static("build"));
app.use("/db", require("express-pouchdb")(PouchDB));

app.listen(port, server => {
  console.log(
    `PouchDB listening on port ${port} - serving /build folder at http:/localhost:${port}`
  );
});
