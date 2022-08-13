const router = require("express").Router();
const {imageMetaData, del_img_id}  = require('../controller/imageData/imageMetaData')


router.get("/imageMetaData",  imageMetaData);
router.post("/del_img_id", del_img_id)


module.exports = router;
