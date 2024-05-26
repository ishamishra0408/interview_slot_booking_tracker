var express = require("express");
var router = express.Router();
const { checkInterviewerValidity } = require("../middleware/auth.middleware");
var { 
    createInterviewerSlot, 
    addAvailabilitySlot, 
    deleteAvailabilitySlot,
    provideInterviewFeedbackAndRating 
} = require("../controllers/interviewer.controller");

//route to create availability slots
router.post("/create-slot", checkInterviewerValidity, createInterviewerSlot);

//route to add availability slots
router.patch("/add-slots", checkInterviewerValidity, addAvailabilitySlot);

//route to delete / remove a slot
router.delete("/remove-slot", checkInterviewerValidity, deleteAvailabilitySlot);

//provide rating , feedback and status for interview
router.patch("/provide-rating/:id", checkInterviewerValidity, provideInterviewFeedbackAndRating);

module.exports = router;