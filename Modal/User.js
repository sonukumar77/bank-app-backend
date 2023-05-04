const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    type:{
      type:String,
      require:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema, "users");




