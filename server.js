require("dotenv").config();
const db = require("./database");
db();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors  = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).send("Hello world!!");
  return;
});


app.use("/user",require("./Routes/userRoutes"));
app.use("/account",require("./Routes/accountRoutes"));

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
