const { update } = require("../../database_services/mongo_crud");
const bcrypt = require("bcrypt");
require("dotenv").config();

const saveUserPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
    let query_params = {
      modelName: "user_data",
      where: { email: email },
      updateData: { password: hash },
      queryType: "updateOne",
    };

    let update_result = await update(query_params);
    if(update_result.modifiedCount==0){
      return res.json({
        status: 2,
        msgType: "success",
        msg : "Sorry! email not found"
      });
    }
    return res.json({
      status: 1,
      msgType: "success",
      msg: `Password updated for + ${email}`
    });

  } catch (error) {
    console.log(error);
    return res.json({
      status: 0,
      msgType: "error",
      msg: `Error message: ${error.toString()}`,
    });
  }
};

module.exports = { saveUserPassword };
