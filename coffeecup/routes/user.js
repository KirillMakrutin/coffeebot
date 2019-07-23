const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/orders", userController.getOrders);
router.get("/order", userController.getOrder);
router.post("/order", userController.postOrder);

module.exports = router;
