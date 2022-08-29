const router = require("express").Router();
const multer = require("multer");
var path = require("path");
const { s3_upload } = require("../database_services/dyanamo_crud");
const { insertquery } = require("../database_services/mongo_crud")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    local_path = '../public/images/rat'
    cb(null, path.join(__dirname, local_path));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".mat") {
      return {
        status: 0,
        msgType: "error",
        msg: cb(new Error(`File type with ${ext} not allowed`)),
      };
    }
    cb(null, true);
  },
});

router.post("/multipleFiles", upload.array("files"), async (req, res, next) => {
  try {
    const files = req.files;
    // console.log(files);
    if (files.length < 1) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return res.send({
        status: 0,
        msgType: "error",
        msg: next(error),
      });
    } else {
      in_data = [];
      for (let f_name in files) {
        await s3_upload(files[f_name]["originalname"]);
        in_data.push({
          diceSore:"N/A",
          filename:files[f_name]["originalname"],
          filepath:"./data/demo/rat/images",
          imageVolume:'N/A',
          precision:"N/A",
          resolution:"1054x1054",
          sampleOrganism:"rat",
          samplingTime:"1.05 sec",
          shareStatus:"Everyone",
          state:"",
          status:"Not analyzed"
        })
      }
      let parms = {
        modelName:'imageMetaData', 
        data : in_data, 
        queryType : '1'
      }
      await insertquery(parms);
      return res.send({
        status: 1,
        msgType: "success",
        msg: `Files uploaded`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: 0,
      msgType: "success",
      msg: `${error.message}`,
    });
  }
});

module.exports = router;
