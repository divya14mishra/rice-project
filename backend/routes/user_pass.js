const router = require('express').Router();
const { saveUserPassword } = require('../controller/savepassword/savepass');

router.post("/savepassword", saveUserPassword );


module.exports = router;