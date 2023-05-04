const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    deposite:{
        type:Number,
        default:0
    },
    withdrawal:{
        type:Number,
        default:0
    },
    total:{
        type:Number,
        default:0
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Account",accountSchema,"accounts");