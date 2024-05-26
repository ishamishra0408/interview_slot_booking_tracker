var express = require("express");
var router = express.Router();
const multer = require("multer");
// const path = require("path");
const { checkTA_Validity } = require("../middleware/auth.middleware");
var { createCandidate, addAvailabilitySlot, deleteAvailabilitySlot } = require("../controllers/candidate.controller");
var upload = multer();

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public");
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1]
//         cb(null,)
//     }
// })

//route to create candidate
router.post("/create-candidate", upload.single('resume_link'), createCandidate);

//route to add availability slots
router.patch("/add-candidate-slot", checkTA_Validity, addAvailabilitySlot);

//route to delete / remove a slot
router.delete("/remove-candidate-slot", checkTA_Validity, deleteAvailabilitySlot);

module.exports = router;