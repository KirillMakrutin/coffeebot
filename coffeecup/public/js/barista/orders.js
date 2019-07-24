$(function() {
  const socket = new WebSocket("ws://localhost:3333");

  socket.onmessage = function(event) {
    const eventData = JSON.parse(event.data);

    switch (eventData.message) {
      case "ORDER_CREATED":
        addOrder(eventData.data);
        return;

      default:
        return;
    }
  };

  function addOrder(order) {
    $tr = $("<tr/>")
      .append(
        $("<td>").text(order.username),
        $("<td>").text(order.size),
        $("<td>").text(order.drink),
        $("<td>").text(new Date(order.time)),
        $("<td>").text(order.status),
        $("<td>").html("<button class='btn btn-success'>Accept</button>")
      )
      .attr("id", order.id)
      .appendTo("#orderRows");
  }
});

function notifyCustomerOrderInProgress(order) {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/orderInProgress",
    data: order
  });
}

function notifyCustomerOrderReady(order) {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/orderReady",
    data: order
  });
}
