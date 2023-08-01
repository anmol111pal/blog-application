const express = require("express");
const router = express.Router();

const { getUserDetails, register, login, logout, update, deleteUser } = require("../controllers/userController.js");


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/update", update);
router.delete("/delete", deleteUser);

router.get("/me", getUserDetails);

module.exports = router;
