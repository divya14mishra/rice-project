const router = require("express").Router();
const { signUpData } = require("../controller/userdata/userdata");
const { find_all } = require("../database_services/mongo_crud");
const { updateUserProfile } = require('../controller/updateProfile/updateProfile')
const { authenticateUserPassword } = require('../controller/userauthentication/auth')
const { saveUserPassword } = require('../controller/savepassword/savepass')
const {userManagement, usersAdminRequest } = require('../controller/usermanagement/usermanagement')

router.post("/signup", signUpData);
router.post("/login", authenticateUserPassword );
router.post("/savepassword", saveUserPassword );
router.post("/updateProfile", updateUserProfile );
router.post("/usermanagement", userManagement );
router.post("/adminrequest", usersAdminRequest );


router.get("/all_users", async (req, res) => {
    try {
        let query_params = {
            modelName: "user_data",
          };
          let data = await find_all(query_params);
          return res.json({
            status: 1,
            msgType: "success",
            data :  data
          });
    } catch (error) {
        console.log(error);
        return res.json({
          status: 0,
          msgType: "error",
          msg: `Error message: ${error.toString()}`,
        });
    }
});

module.exports = router;
