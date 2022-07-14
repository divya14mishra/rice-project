const { update, deleteQuery } = require("../../database_services/mongo_crud");

const userManagement = async (req, res) => {
  try {
    let { id, flag } = req.body;
    // flags conditions
    // 0: accept admin request
    // 1: reject admin request
    // 2: change admin back to user
    // 3: delete user or admin
    switch (flag) {
      case 0:
        var status = 2;
        break;
      case 1:
        var status = 0;
        break;
      case 2:
        var status = 0;
        break;
      case 3:
        var status = 3;
        break;
    }
    if (status != 3) {
      if (status == 0) {
        var query_params = {
          modelName: "user_data",
          where: { _id: id },
          updateData: {
            admin_status: status,
          },
          queryType: "updateOne",
        };
      } else {
        query_params = {
          modelName: "user_data",
          where: { _id: id },
          updateData: {
            admin_status: status,
            usertype: "admin",
          },
          queryType: "updateOne",
        };
      }

      let update_result = await update(query_params);

      if (update_result.modifiedCount == 0) {
        return res.json({
          status: 2,
          msgType: "success",
          msg: "Sorry! user id not found",
        });
      }
      return res.json({
        status: 1,
        msgType: "success",
        msg: `Work Updated!`,
      });
    } else {
      let query_params = {
        modelName: "user_data",
        condition: { _id: id },
        query_type: "deleteOne",
      };
      let del_result = await deleteQuery(query_params);
      if (del_result.deletedCount == 0) {
        return res.json({
          status: 2,
          msgType: "success",
          msg: "Sorry! user id not found",
        });
      }
      return res.json({
        status: 1,
        msgType: "success",
        msg: `User's data deleted!`,
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

const usersAdminRequest = async (req, res) => {
  try {
    let { id } = req.body;
    let query_params = {
      modelName: "user_data",
      where: { _id: id },
      updateData: {
        admin_status: 1,
      },
      queryType: "updateOne",
    };
    let update_result = await update(query_params);

    if (update_result.modifiedCount == 0) {
      return res.json({
        status: 2,
        msgType: "success",
        msg: "Request not sent, try again.",
      });
    }
    return res.json({
      status: 1,
      msgType: "success",
      msg: `Reqest sent.`,
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

module.exports = { userManagement, usersAdminRequest };
