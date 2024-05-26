var mongoose = require('mongoose');

const interviewSchema =mongoose.Schema({
    candidate_id: {
        type: String, 
        ref: "candidates"
    },
    interviewer_id: {
        type: String,
        ref: 'users'
    },
    interview_slot: {
        type: Date
    },
    rating: {
        type: Number,
        default: null
    },
    feedback: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['CREATED', 'SELECTED', 'REJECTED'],
        default: "CREATED"
    },
});
 const interview  = mongoose.model("Interview", interviewSchema);

 module.exports = interview;