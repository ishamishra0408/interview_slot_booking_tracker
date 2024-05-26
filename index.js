var express = require("express");
var cors = require("cors");
var app = express();
var dotenv = require('dotenv').config();
var port = process.env.PORT || process.env.PORT;
var dbConn = require("./config/dbConn");
const { scheduleNewInterview } = require("./queues/scheduleInterview.queue");
//importing all required routes
const registerRoute = require("./routes/user.routes");
const interviewerRoute = require("./routes/interviewer.routes");
const candidateRoute = require("./routes/candidate.routes");

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// for parsing multipart/form-data
app.use(express.static('public'));


app.use("/api/v1", registerRoute, interviewerRoute, candidateRoute);

app.get("/", (req, res) => {
    res.send("Ta Tracker system is live")
})

app.post("/test", async (req, res) => {
    await scheduleNewInterview(req.body);
    res.send("Okay")
})

app.listen(port, () => {
    console.log(`TA Tracker server currently listening on port ${ port }`)
})