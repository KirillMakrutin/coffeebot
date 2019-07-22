const Order = require("../models/order");

exports.getOrders = (req, res) => {
  res.render("barista/orders", {
    pageTitle: "Orders",
    path: "/barista/orders",
    orders: Order.findAll()
  });
};

exports.newOrder = (req, res) => {
  new Order("Unknown user", "M", "Americano", new Date()).save();

  res.redirect("/barista/orders");
};
