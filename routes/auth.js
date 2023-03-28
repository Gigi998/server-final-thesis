const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

router.get("/", authController);

module.exports = router;
