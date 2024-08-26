const express = require("express");
const { signup, login } = require("../controllers/users.controllers");

const router = express.Router();

router.post("/signup", signup);
router.get("/login", login);

module.exports = router;
