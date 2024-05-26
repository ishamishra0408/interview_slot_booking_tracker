var jwt = require('jsonwebtoken');

const checkTA_Validity = function (req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		req.token = bearerHeader;
		try {
			const data = jwt.verify(req.token, 'secretKey');
            if (data.user.type != 'TA') {
                res.status(401).json({ message: "You are not Authorized for this operation" });
            } else {
                next();
            }
		  } catch (error) {
			res.status(401).json({ message: "Auth failed!" });
		}
	} else {
		res.status(401).json({ message: "Kindly supply Authorization token" });
	}
}

const checkInterviewerValidity = function (req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		req.token = bearerHeader;
		try {
			const data = jwt.verify(req.token, 'secretKey');
            if (data.user.type != 'INTERVIEWER') {
                res.status(401).json({ message: "You are not Authorized for this operation" });
            } else {
                next();
            }
		  } catch (error) {
			res.status(401).json({ message: "Auth failed!" });
		}
	} else {
		res.status(401).json({ message: "Kindly supply Authorization token" });
	}
}

module.exports = {
    checkTA_Validity,
    checkInterviewerValidity
}