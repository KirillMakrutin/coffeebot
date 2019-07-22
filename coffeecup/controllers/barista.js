const orders = [
  {
    username: "Kirill",
    cup: "xl",
    type: "cappuccino",
    time: new Date()
  },
  {
    username: "Sergey",
    cup: "standard",
    type: "espresso",
    time: new Date()
  }
];

exports.getOrders = (req, res) => {
  res.render("barista/orders", {
    pageTitle: "Orders",
    path: "/barista/orders",
    orders: orders
  });
};

exports.newOrder = (req, res) => {
  orders.push({
    username: "Unknown user",
    cup: "standard",
    type: "americano",
    time: new Date()
  });

  res.redirect("/barista/orders");
};
