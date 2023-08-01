const express = require("express");
const router = express.Router();
const path = require("path");

const { getUserDetails, register, login, logout, update } = require("../controllers/userController.js");


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/update", update);

router.get("/me", getUserDetails);

module.exports = router;
