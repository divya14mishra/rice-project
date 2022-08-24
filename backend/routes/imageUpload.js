const router = require("express").Router();
const multer = require("multer");
var path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/rat"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
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

router.post("/multipleFiles", upload.array("files"), (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (files.length == 0 ) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return res.send({
      status: 0,
      msgType: "error",
      msg: next(error),
    });
  }
  return res.send({
    status: 1,
    msgType: "success",
    msg: `file uploaded`,
  });
});

module.exports = router;
