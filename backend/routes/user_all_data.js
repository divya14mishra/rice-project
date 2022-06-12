const router = require('express').Router();
const {  signUpData } = require('../controller/userdata/userdata');

router.post("/signup", signUpData );


module.exports = router;