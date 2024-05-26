var express = require("express");
var router = express.Router();
const { checkTA_Validity } = require("../middleware/auth.middleware");
var { seedDB, registerUser, login, viewCandidateDetails } = require("../controllers/user.controllers");

//route to seed DB (Create TA1)
router.post("/seed-db", seedDB);

//route to register a user
router.post("/register", checkTA_Validity, registerUser);

//route to login
router.post("/login", login);

//route to view candidate details
router.get("/candidate/:id", checkTA_Validity, viewCandidateDetails);

module.exports = router;