const Order = require("../models/order");
const orderEvents = require("../events/order");

const orderStatus = require("../models/orderStatus");

exports.getOrders = (req, res) => {
  res.render("barista/orders", {
    pageTitle: "Orders",
    path: "/barista/orders",
    orders: Order.findAll().filter(
      order => order.status !== orderStatus.CANCELED
    )
  });
};

exports.newOrder = (req, res) => {
  const newOrder = new Order("User by Bot", "M", "Americano", new Date());
  newOrder.save();
  orderEvents.emitter.emit(orderEvents.event_ORDER_CREATED, newOrder);

  res.redirect("/barista/orders");
};
