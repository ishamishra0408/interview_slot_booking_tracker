var mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    name: {
        type: String, 
        unique: true
    },
    phone: {
        type: Number,
        unique: true
    },
    active: {
        type: Boolean
    },
    password: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    type: {
        type: String,
        enum : ['TA','INTERVIEWER']
    }
});
 const user  = mongoose.model("User", userSchema);

 module.exports = user;