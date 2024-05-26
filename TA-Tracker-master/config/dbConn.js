var mongoose = require("mongoose");
var dotenv = require("dotenv")
dotenv.config();
var url = 'mongodb+srv://ishamishra0408:Jeet$1234@cluster0.abzglzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

var conn = mongoose.connect(url, {
    useNewUrlParser: true, 
	useUnifiedTopology: true
})
.then(() => console.log("Database successfully connected"))
.catch((err) => console.log("DB unable to connect ", err))

module.exports = conn;