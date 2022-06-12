const { update } = require('../../database_services/mongo_crud')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";

const saveUserPassword = async (req, res) => {
  try {
    let { username, password } = req.body;
    password = myPlaintextPassword;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    const okk = bcrypt.compareSync(myPlaintextPassword, hash);
    
    let query_params = {
        modelName: 'user_data', 
        where: { username : username }, 
        updateData: { password : hash }, 
        queryType : 'updateOne'
    }
    await update(query_params)

    return res.json({
      status: 1,
      msgType: "success",
      hash: hash,
      ok : okk,
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
