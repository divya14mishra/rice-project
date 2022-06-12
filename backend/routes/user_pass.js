const router = require('express').Router();
const { saveUserPassword } = require('../controller/savepassword/savepass');

router.post("/newpassword", saveUserPassword );


module.exports = router;