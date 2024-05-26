var mongoose = require('mongoose');

const candidateSchema =mongoose.Schema({
    name: {
        type: String, 
        unique: true
    },
    phone: {
        type: Number,
        unique: true
    },
    status: {
        type: String,
        enum : ['CREATED','SCHEDULED', 'SELECTED', 'REJECTED'],
        default: "CREATED"
    },
    resume_link: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    availability_slots: {
        type: Array
    },
    interview: {
        type: mongoose.Schema.ObjectId,
        default: null
    }
});
 const candidate  = mongoose.model("Candidate", candidateSchema);

 module.exports = candidate;