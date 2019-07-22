const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const baristaRouter = require("./routes/barista");
const errorRouter = require("./routes/error");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

app.use("/barista", baristaRouter);

app.use("/favicon.ico", (req, res) => {
  res.sendStatus(200);
});

// routes to error page if request was unhadled
app.use(errorRouter);

app.listen(3333);

// test comment2
