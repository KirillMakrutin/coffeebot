const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const WebSocket = require("ws");
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

const server = app.listen(3333);

// https://www.npmjs.com/package/ws
// see different ways how to connect https://stackoverflow.com/a/17697134
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  console.log("Websocket connection established");

  //connection is up, let's add a simple simple event
  ws.on("message", message => {
    //log the received message and send it back to the client
    console.log(`received: ${message}`);
    ws.send(`Hello, you sent -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection
  ws.send("Hello there, I am a WebSocket server");
});
