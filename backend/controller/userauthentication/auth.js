const { find_one } = require("../../database_services/mongo_crud");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const authenticateUserPassword = async (req, res) => {
  try {
    let { username, password } = req.body;

    let query_params = {
      modelname : "user_data",
      where: { username: username },
    };
    check_user = await find_one(query_params);
    console.log(check_user);

    return res.json({
      status: 1,
      msgType: "success",
      data: check_user,
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

module.exports = { authenticateUserPassword };
