const orders = [];

class Order {
  constructor(username, size, drink, time) {
    this.username = username;
    this.size = size;
    this.drink = drink;
    this.time = time;
  }

  save() {
    orders.push(this);
  }

  static findAll() {
    return orders;
  }
}

// test data
new Order("Kirill", "XL", "Cappuccino", new Date()).save();
new Order("Sergey", "M", "Espresso", new Date()).save();

module.exports = Order;
