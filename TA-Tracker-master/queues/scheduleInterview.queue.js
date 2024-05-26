const Bull = require("bull");
const { Queue } = require("bullmq");
const { scheduleProcess } = require("../processes/scheduleInterview.process");

const scheduleInterviewQueue = new Bull('scheduleInterview', {
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: ''
    }
});

scheduleInterviewQueue.process(scheduleProcess);

const scheduleNewInterview = (data) => {
    scheduleInterviewQueue.add(data, {
        repeat: {
            cron: '* * */1 * * *',
        },
        attempts: 2
    })
}


module.exports = {
    scheduleNewInterview
}