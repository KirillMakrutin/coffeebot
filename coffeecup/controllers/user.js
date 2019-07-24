const User = require("../models/user");
const Order = require("../models/order");
const orderEvents = require("../events/order");

const defaultUser = new User("19XX");

exports.getOrders = (req, res) => {
  const orders = Order.findAllByUser(defaultUser.username);
  res.render("user/orders", {
    pageTitle: "My Orders",
    path: "/user/orders",
    orders: orders
  });
};

exports.getOrder = (req, res) => {
  res.render("user/order", {
    pageTitle: "New order",
    path: "/user/order"
  });
};

// FIXME it seems that we need a separate endpoint for bot due to different data types: form and application/json
exports.postOrder = (req, res) => {
  const body = req.body;

  const newOrder = new Order(
    defaultUser.username,
    body.size,
    body.drink,
    new Date()
  );
  newOrder.save();

  orderEvents.emitter.emit(orderEvents.event_ORDER_CREATED, newOrder);

  res.redirect("/user/orders");
};
