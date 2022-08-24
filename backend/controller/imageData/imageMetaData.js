const router = require("express").Router();
const {
  find_all,
  deleteQuery,
  update,
} = require("../../database_services/mongo_crud");

const imageMetaData = async (req, res) => {
  try {
    let { flag } = req.body;
    if (flag == 0) {
      var query_params = {
        modelName: "imageMetaData",
        where: { status: "Not analyzed" },
      };
    } else {
      query_params = {
        modelName: "imageMetaData",
      };
    }
    let data = await find_all(query_params);
    return res.json({
      status: 1,
      msgType: "success",
      data: data,
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

const del_img_id = async (req, res) => {
  try {
    let { _id } = req.body;
    let query_params = {
      modelName: "imageMetaData",
      condition: { _id: _id },
      query_type: "deleteOne",
    };
    let del_result = await deleteQuery(query_params);
    if (del_result.deletedCount == 0) {
      return res.json({
        status: 2,
        msgType: "success",
        msg: "Sorry! something went wrong",
      });
    }
    return res.json({
      status: 1,
      msgType: "success",
      msg: `File Deleted!`,
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

const update_exp_status = async (req, res) => {
  try {
    let { _id, diceSore, precision } = req.body;
    let query_params = {
      modelName: "imageMetaData",
      where: { _id: _id },
      updateData: {
        $set: { status: "analyzed", diceSore: diceSore, precision: precision },
      },
    };
    let del_result = await update(query_params);

    if (del_result != null) {
      return res.json({
        status: 1,
        msgType: "success",
        msg: `File Updated!`,
        data: del_result,
      });
    }
    return res.json({
      status: 2,
      msgType: "success",
      msg: "Sorry! something went wrong",
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

module.exports = { imageMetaData, del_img_id, update_exp_status };
