const bcrypt = require("bcrypt");

const hashPassword = (password) => {
    const hashdata = bcrypt.hash(password, 15);
    return hashdata;
}

module.exports = {
    hashPassword
}