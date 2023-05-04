const express = require("express");
const { validateToken } = require("../Middleware/validateUser");
const {
  getAllTransaction,
  deposite,
  withdrawal,
  getTransactionByEmail,
} = require("../Controller/accountController");
const router = express.Router();


router.get("/all", validateToken, getAllTransaction);
router.post("/deposite", validateToken, deposite);
router.post("/withdrawal", validateToken, withdrawal);
router.post("/transactions", validateToken, getTransactionByEmail);

module.exports = router;
