const jwt = require("jsonwebtoken");

const decodeJwt = (__token) => {
    try {
        const userData = jwt.verify(__token, 'secretKey')
        return userData;
    } catch (error) {
        return error;
    }
}

module.exports = {
    decodeJwt
}