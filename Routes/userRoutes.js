const express = require("express");
const { validateEmailAndPassword, validateNameEmailPassword, validateCustomerType, validateToken } = require("../Middleware/validateUser");
const { loginUser, registerUser } = require("../Controller/userAuthController");
const { getAllUser, getUserByType } = require("../Controller/userController");
const router = express.Router();

router.get("/all",getAllUser);
router.post("/type",validateToken,validateCustomerType,getUserByType);
router.post("/register",validateNameEmailPassword,registerUser);
router.post("/login",validateEmailAndPassword,loginUser);


module.exports = router;