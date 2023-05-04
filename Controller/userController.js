const UserModal = require("../Modal/User");

class UserController {

  async getAllUser(req, res) {
    try {
      const users = await UserModal.find();
      if (users) {
        res.status(200).send({ message: "Record found!!", users });
        return;
      } else {
        res.status(400).send({ message: "Record not found!!" });
        return;
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ message: "try again later!" });
      return;
    }
  }


  async getUserByType(req, res) {
    const {type} = req.body;
    try {
      const users = await UserModal.find({type});
      if (users) {
        res.status(200).send({ message: "Record found!!", users });
        return;
      } else {
        res.status(400).send({ message: "Record not found!!" });
        return;
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ message: "try again later!" });
      return;
    }
  }
  
}

module.exports = new UserController();
