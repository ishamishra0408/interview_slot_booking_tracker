const { decodeJwt } = require("../helper/jwt.helper");
const interviewerSlotModel = require("../models/interviewerSlot");
const interviewModel = require("../models/interview");
const { updateCandidateStatus } = require("../helper/interview.helper");

const createInterviewerSlot = (req, res) => {
    const { availability_slots } = req.body;
    const user = decodeJwt(req.token);
    var payload = {
        interviewer_id: user.user._id,
        availability_slots
    }
    interviewerSlotModel.create(payload)
    .then(() => res.status(200).json("Slot created successfully"))
    .catch((err) => res.status(501).json("Unable to create slot", err))
}

const addAvailabilitySlot = async (req, res) => {
    const { new_slots } = req.body;
    const userData = decodeJwt(req.token);
    await interviewerSlotModel.findOne({interviewer_id: userData.user._id})
    .then((user) => {
        const userAvailableSlot = user.availability_slots
        new_slots.forEach((slot) => {
            userAvailableSlot.push(slot)
        })
        interviewerSlotModel.findOneAndUpdate({interviewer_id: userData.user._id}, {$set: {availability_slots: userAvailableSlot}})
        .then(() => {
            res.status(200).json("Available slot added successfully")
        })
        .catch((err) => res.status(501).json("Unable to add available slot", err))
    })
}

const deleteAvailabilitySlot = async (req, res) => {
    const { slotToDelete } = req.body
    const userData = decodeJwt(req.token);
    await interviewerSlotModel.findOne({interviewer_id: userData.user._id})
    .then((result) => {
        var userSlots = result.availability_slots;
        var filteredArray = userSlots.filter(e => e !== slotToDelete);
        interviewerSlotModel.findOneAndUpdate({interviewer_id: userData.user._id}, {$set: {availability_slots: filteredArray}})
        .then(() => {
            res.status(200).json("Slot removed successfully")
        })
        .catch((err) => res.status(501).json("Unable to remove slot", err))
    })
}

const provideInterviewFeedbackAndRating = async (req, res) => {
    const { rating, feedback, status } = req.body;
    const id = req.params.id;
    const userData = decodeJwt(req.token);
    interviewModel.findOne({_id: id}, (err, result) => {
        if (result.interviewer_id === userData.user._id) {
            interviewModel.findOneAndUpdate({_id: id}, {$set: {rating,feedback,status}})
            .then(() => {
                res.status(200).json("Interview details updated successfully");
                //update candidate status in candidate model
                updateCandidateStatus(result.candidate_id, status);
            })
            .catch((err) => res.status(501).json("Unable to update interview details", err))
        } else {
            console.log("You aren't the assigned interviewer for this interview")
        }
    })
}

module.exports = {
    createInterviewerSlot,
    addAvailabilitySlot,
    deleteAvailabilitySlot,
    provideInterviewFeedbackAndRating
}