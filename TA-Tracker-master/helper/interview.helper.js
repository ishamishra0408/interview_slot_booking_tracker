const candidateModel = require("../models/candidate");

const updateCandidateStatus = (candidateId, status) => {
    candidateModel.findOneAndUpdate({_id: candidateId}, {$set: {status}})
    .then(() => console.log("Candidate status updated"))
    .catch((err) => console.log("Unable to update candidate status", err))
}

module.exports = {
    updateCandidateStatus
}