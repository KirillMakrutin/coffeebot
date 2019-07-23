const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const WebSocket = require("ws");
const baristaRouter = require("./routes/barista");
const userRouter = require("./routes/user");
const errorRouter = require("./routes/error");
const orderEvents = require("./events/order");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

app.use("/barista", baristaRouter);
app.use("/user", userRouter);

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

  orderEvents.emitter.on(orderEvents.event_ORDER_CREATED, order => {
    ws.send(
      JSON.stringify({
        message: orderEvents.event_ORDER_CREATED,
        data: order
      })
    );
  });
});
