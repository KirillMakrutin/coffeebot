const orderEvents = require("../../events/order");
const onOrderCreated = require("./onOrderCreated");

const onConnect = ws => {
  console.log("Websocket connection established");
  orderEvents.emitter.on(orderEvents.event_ORDER_CREATED, onOrderCreated(ws));
};

module.exports = onConnect;
