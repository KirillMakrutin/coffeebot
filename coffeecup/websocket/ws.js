const WebSocket = require("ws");
const onConnect = require("./handlers/onConnect");

const createWebSocket = server => {
  // https://www.npmjs.com/package/ws
  // see different ways how to connect https://stackoverflow.com/a/17697134
  const wss = new WebSocket.Server({ server });

  wss.on("connection", onConnect);

  return wss;
};

module.exports = createWebSocket;
