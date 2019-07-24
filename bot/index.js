"use strict";
const BootBot = require("bootbot");
const axios = require("axios");
const cors = require("cors");

const TOKEN =
  "DQVJ1cmxFTkRYQUZArcWZAiYXlJcHJwSDY4Q3ViZAGFnbW05ckgzS2c2bUNmWk1tdE9KbG5xclRqR1pJeU1SYTlQQ2RNWXh5aXI3RjBjRWlSaEt2R3pqRmJaWmwwVTFtSmlXUGtIaU92Y1dTVnhZAc2laWGF0a0NyaExFYkQ2cGtsUHlTSzRKZAjAwUGlNQ19kYjlrdjYzSWxFUW8tei05b29zQmpRWXhBTWI3eE5Ja1FCQ3pfZAERDMzVhQ2lHZAmdKaUF3TFNmRWhTb2xvOVB2NWVvUwZDZD";

const bot = new BootBot({
  accessToken: TOKEN,
  verifyToken: "test",
  appSecret: "185675b4d6384b57e1296b05b5a5790c"
});

const coffeeList = [
  "Americano",
  "Latte",
  "Cappuccino",
  "Espresso",
  "Macchiato ",
  "Mochaccino"
];
const coffeeSizes = ["S", "M", "L", "XL"];

const CONFIRM = "CONFIRM";
const CANCEL = "CANCEL";

bot.hear("hello", (payload, chat) => {
  chat.conversation(convo => {
    convo.sendTypingIndicator(1000).then(() => sayHello(convo, payload));
  });
});

const sayHello = (convo, payload) => {
  const customerId = payload.sender.id;

  axios
    .get(
      "https://graph.facebook.com/" +
        customerId +
        "?fields=id,name" +
        "&access_token=" +
        TOKEN
    )
    .then(response => {
      const customerName = response.data.name;

      convo.set("customerName", customerName);
      convo.set("customerId", customerId);

      convo
        .say(
          "Hello, " +
            customerName +
            ", this is ISSoft workplace coffee chat bot!"
        )
        .then(() => askCoffee(convo));
    })
    .catch(error => console.log(error));
};

const askCoffee = convo => {
  const question = {
    text: `Which coffee do you want to order?`,
    quickReplies: coffeeList
  };

  const callbacks = [
    {
      event: "quick_reply",
      callback: (payload, convo) => {
        const coffee = payload.message.text;

        convo.set("coffee", coffee);

        convo
          .say(`Got it, you want ${coffee}`)
          .then(() => askCoffeeSize(convo));
      }
    }
  ];

  convo.ask(question, doNothing, callbacks, defaultOptions);
};

const askCoffeeSize = convo => {
  const question = {
    text: `Which coffee size do you want to order?`,
    quickReplies: coffeeSizes
  };

  const callbacks = [
    {
      event: "quick_reply",
      callback: (payload, convo) => {
        const coffeeSize = payload.message.text;

        convo.set("coffeeSize", coffeeSize);

        convo
          .say(`Got it, you want size: ${coffeeSize}`)
          .then(() => confirmOrder(convo));
      }
    }
  ];

  convo.ask(question, doNothing, callbacks, defaultOptions);
};

const confirmOrder = convo => {
  const customerId = convo.get("customerId");
  const customerName = convo.get("customerName");
  const coffee = convo.get("coffee");
  const coffeeSize = convo.get("coffeeSize");

  const order = {
    customerId: customerId,
    username: customerName,
    drink: coffee,
    size: coffeeSize
  };

  const question = {
    text: `${customerName}, your order is [${coffee} - ${coffeeSize}]. Please confirm your order`,
    buttons: [
      { type: "postback", title: CONFIRM, payload: CONFIRM },
      { type: "postback", title: CANCEL, payload: CANCEL }
    ]
  };

  const callbacks = [
    {
      event: "postback:" + CONFIRM,
      callback: (payload, convo) => {
        convo
          .say("Ok, your order has been confirmed.")
          .then(() => createOrder(order, convo));
      }
    },
    {
      event: "postback:" + CANCEL,
      callback: (payload, convo) => {
        convo
          .say("Your order has been cancelled")
          .then(() => sayHello(convo, payload));
      }
    }
  ];

  convo.ask(question, doNothing, callbacks, defaultOptions);
};

const createOrder = (order, convo) => {
  axios
    .post("http://localhost:3333/user/order", order)
    .then(() => {
      convo.say(
        "Please wait, I'll notify you when your coffee will be ready..."
      );
    })
    .catch(error => console.log(error));
};

bot.app.use(
  cors({
    origin: "http://localhost:3333"
  })
);

bot.app.post("/orderReady", function(req, res) {
  //TODO and FIXME: send message to customer + figure out why req body is {]
  console.log(req);
});

bot.app.post("/orderInProgress", function(req, res) {
  //TODO and FIXME: send message to customer + figure out why req body is {]
  console.log(req);
});

bot.start();

const defaultOptions = {
  typing: true
};

const doNothing = () => {};
