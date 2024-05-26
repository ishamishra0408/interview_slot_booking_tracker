const candidateModel = require("../models/candidate");
const interviewerSlotModel = require("../models/interviewerSlot");
const interviewModel = require("../models/interview");
const WebSocket = require("ws");
const websocketServer = new WebSocket.Server({
    port: 8000,
    path: "/websockets",
});

websocketServer.on('connection', ws => {
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
    })
    ws.send('Hello! Message From Server!!')
})
  

const checkAvailabilitySlotMatch = (candidate, interviewer) => {
    for (let i = 0; i < interviewer.length; i++) {
        var candidateAvailabilitySlot = candidate.availability_slots;
        var interviewerSlot = interviewer[i].availability_slots;
        const filteredArray = candidateAvailabilitySlot.filter(value => interviewerSlot.includes(value));
        if (filteredArray) {
            scheduleInterview(filteredArray[0], candidate, interviewer[i])
            break;
        } else {
            //emitting candidate ID 
            websocketServer.emit("send message to TA team", candidate._id);
        }
    }
}



const scheduleInterview = (date, candidate, interviewer) => {
    var payload = {
        candidate_id: candidate._id,
        interviewer_id: interviewer.interviewer_id,
        interview_slot: date
    }
    interviewModel.create(payload)
    .then((result) => {
        console.log("Interview created for user: ", candidate._id);
        moveCandidateStatusToScheduled(result.candidate_id, result._id)
    })
    .catch((err) => console.log("unable to create Interview for user: ", candidate._id))
}



const moveCandidateStatusToScheduled = (candidateId, scheduledInterviewId) => {
    candidateModel.findOneAndUpdate({_id: candidateId}, {$set: {status: "SCHEDULED", interview: scheduledInterviewId}})
    .then(() => console.log("Updated"))
    .catch((err) => console.log(err))
}



const scheduleProcess = async (job) => {
    const data = await candidateModel.find({status: 'CREATED', interview: null})
    data.forEach(async (user) => {
        await interviewerSlotModel.find({}, async (err, result) => {
            await checkAvailabilitySlotMatch(user, result);
        });
    })
    console.log("Background scheduler running")
}



module.exports = {
    scheduleProcess
}