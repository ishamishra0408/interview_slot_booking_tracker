var mongoose = require('mongoose');

const interviewerSlotSchema =mongoose.Schema({
    interviewer_id: {
        type: String, 
        ref: "users"
    },
    availability_slots: {
        type: Array
    },
});
 const interviewerSlot  = mongoose.model("InterviewerSlot", interviewerSlotSchema);

 module.exports = interviewerSlot;