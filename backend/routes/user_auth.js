const router = require('express').Router();
const { authenticateUserPassword  } = require('../controller/userauthentication/auth');

router.post("/authenticate", authenticateUserPassword );


module.exports = router;