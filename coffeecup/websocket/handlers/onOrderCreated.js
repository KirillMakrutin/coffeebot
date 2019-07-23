const orderEvents = require("../../events/order");

const onOrderCreated = ws => order => {
  ws.send(
    JSON.stringify({
      message: orderEvents.event_ORDER_CREATED,
      data: order
    })
  );
};

module.exports = onOrderCreated;
