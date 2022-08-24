const router = require("express").Router();
const {imageMetaData, del_img_id, update_exp_status}  = require('../controller/imageData/imageMetaData')


router.post("/imageMetaData",  imageMetaData);
router.post("/del_img_id", del_img_id);
router.post("/update_exp_status", update_exp_status);


module.exports = router;
