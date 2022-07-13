const { update } = require("../../database_services/mongo_crud");

const updateUserProfile = async (req, res) => { 
  try {
    let { id, username, firstname, lastname, address, contact, inputState, inputCity, inputCountry, inputZip } = req.body;
    let query_params = {
        modelName: "user_data",
        where: { _id: id },
        updateData: {
            _id: id, 
            username: username, 
            firstname:firstname, 
            lastname: lastname, 
            address:address, 
            contact: contact,  
            inputState: inputState,  
            inputCity: inputCity,  
            inputZip: inputZip,  
            inputCountry: inputCountry,  
        },
        queryType: "updateOne",
      };

      let update_result = await update(query_params);

      if(update_result.modifiedCount==0){
        return res.json({
          status: 2,
          msgType: "success",
          msg : "Sorry! ID not found"
        });
      }
    return res.json({
      status: 1,
      msgType: "success",
      msg: `Profile updated!`
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

module.exports = { updateUserProfile };
