const mongoose = require("mongoose");
const Accounts = require("../Modal/Accounts");
const User = require("../Modal/User");

class AccountController {

  async getAllTransaction(req, res) {
    try {
      let getAllTransaction = await Accounts.find();
      if (!getAllTransaction) {
        res.status(400).send({ message: "No record faound" });
        return;
      }
      res.status(200).send({ message: "Record found!!", getAllTransaction });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `try gain later` });
      return;
    }
  }


  async deposite(req, res) {
    const { email, deposite_amount } = req.body;

    try {
      let findUser = await User.findOne({ email });
      if (findUser) {
        let getLastTransaction = await Accounts.find({ email });
        // console.log(getLastTransaction)
        if (getLastTransaction.length > 0) {
          let lastData = getLastTransaction.findLast(
            (element) => element.email === email
          );
          if (!lastData) {
            res.status(400).send({ message: "Please provide valid data!" });
            return;
          }

          const data = await Accounts.create({
            email,
            deposite: deposite_amount,
            widhdrawal: 0,
            total: lastData.total + deposite_amount,
          });

          res
            .status(200)
            .send({ message: `${data.deposite} credited!!`, data });
          return;
        } else {
          const data = await Accounts.create({
            email,
            deposite: deposite_amount,
            widhdrawal: 0,
            total: deposite_amount,
          });

          res
            .status(200)
            .send({ message: `${data.deposite} credited!!`, data });
          return;
        }
      } else {
        res.status(500).send({ message: "Unauthorized user!!!" });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `try gain later` });
      return;
    }
  }

  async withdrawal(req,res){

    const {email,withdrawal_amount} = req.body;

    try{

        let getLastTransaction = await Accounts.find({email});
        let lastData = getLastTransaction.findLast((element) => element.email===email);
        if(!lastData ){
            res.status(400).send({ message: "Please provide valid data!" });
            return;
        }
        if(withdrawal_amount>lastData.total){
           
            res.status(200).send({message:" Insufficient Funds!!"});
             return;
        }else{
            const data = await Accounts.create({
                email,
                deposite:0,
                withdrawal:withdrawal_amount,
                total:lastData.total-withdrawal_amount
            });

            res.status(200).send({message:`${data.withdrawal} withdrawal!!`,data});
            return;
        }   

    }catch(error){
        console.log(error);
        res.status(500).send({message:`try gain later`});
        return;
    }
  }

  async getTransactionByEmail(req,res){
    const {email }= req.body;
    try{

        let getTransaction = await Accounts.find({email});
        if(!getTransaction ){
            res.status(400).send({ message: "No record faound" });
            return;
        }
            res.status(200).send({message:"Record found!!",getTransaction});
            return;
        
    }catch(error){
        console.log(error);
        res.status(500).send({message:`try gain later`});
        return;
    }
  }

}

module.exports = new AccountController();
