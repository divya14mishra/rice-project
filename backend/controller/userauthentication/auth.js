const { find_one } = require("../../database_services/mongo_crud");
const bcrypt = require("bcrypt");

const authenticateUserPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    let query_params = {
      modelName: "user_data",
      where: { email: email },
    };
    check_user = await find_one(query_params);
    console.log('-->>user-->>',check_user)
    if (check_user == null) {
      console.log("No user found with this email");
      return res.json({
        status: 2,
        msgType: "success",
        msg:'No user found with this email',
      });
    } else {
      const hash = check_user.password;
      const okk = bcrypt.compareSync(password, hash);
      if (okk == false) {
        return res.json({
          status: 2,
          msgType: "success",
          msg: 'Password incorrect'
        });
      }
    }
    return res.json({
      status: 1,
      msgType: "success",
      data: check_user.usertype,
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
