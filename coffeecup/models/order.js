const uuidv1 = require("uuid/v1");
const orderStatus = require("./orderStatus");
const orders = [];

class Order {
  constructor(username, size, drink, time) {
    this.id = uuidv1();
    this.username = username;
    this.size = size;
    this.drink = drink;
    this.time = time;
    this.status = orderStatus.CREATED;
  }

  save() {
    orders.push(this);
  }

  static findAll() {
    return orders;
  }

  static findAllByUser(username) {
    return orders.filter(order => order.username === username);
  }
}

// test data
new Order("Kirill", "XL", "Cappuccino", new Date()).save();
new Order("Sergey", "M", "Espresso", new Date()).save();

module.exports = Order;
