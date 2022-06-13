const { insertquery, find_one } = require("../../database_services/mongo_crud");

const signUpData = async (req, res) => {
  try {
    let {
      username, email,firstname,lastname,address,contact,inputState,inputCity,inputCountry,inputZip,usertype,} = req.body;
    var data = {
      username: username,
      email: email,
      firstname: firstname,
      lastname: lastname,
      address: address,
      contact: contact,
      inputState: inputState,
      inputCity: inputCity,
      inputCountry: inputCountry,
      inputZip: inputZip,
      usertype: usertype,
    };

    let query_params = {
      modelName: "user_data",
      where: { email: email },
    };

    check_user = await find_one(query_params);
    if (check_user == null) {
        query_params = {
            modelName: "user_data",
            data: data,
          };
          await insertquery(query_params);
          return res.json({
            status: 1,
            msgType: "success",
          });
    }
    else{
        return res.json({
            status: 2,
            msgType: "Email already exists!",
          });
    }
    
  } catch (error) {
    console.log(error);
    return res.json({
      status: 0,
      msgType: "error",
      msg: `Error message: ${error.toString()}`,
    });
  }
};

module.exports = { signUpData };
