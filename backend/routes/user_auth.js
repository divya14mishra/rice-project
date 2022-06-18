const router = require('express').Router();
const { authenticateUserPassword  } = require('../controller/userauthentication/auth');

router.post("/login", authenticateUserPassword );


module.exports = router;