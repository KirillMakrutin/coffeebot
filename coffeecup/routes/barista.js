const router = require("express").Router();
const baristaController = require("../controllers/barista");

router.get("/orders", baristaController.getOrders);
router.post("/order", baristaController.newOrder);

module.exports = router;
