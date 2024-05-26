var dotenv = require('dotenv').config();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var userModel = require("../models/user");
var candidateModel = require("../models/candidate");
var { hashPassword } = require("../helper/passwordHash.helper");

const seedDB = async (req, res) => {
    await hashPassword(process.env.seed_user_password)
    .then((hashedPassword) => {
        var payload = {
            name: "Product Owner",
            phone: 8175052428,
            active: true,
            password: hashedPassword,
            created_at: Date.now(),
            updated_at: Date.now(),
            type: "TA"
        }
        userModel.create(payload)
        .then(() => res.status(201).json("DB Seeding successful"))
        .catch((err) => res.status(501).json("Unable to seed DB", err))
    })
    .catch((err) => res.status(401).json("Unable to hash password", err))
}

const login = (req, res) => {
    const { phone, password } = req.body;
    userModel.findOne({phone: phone}, (err, user) => {
        if (!user) {
            res.status(501).json("User not found")
        }
    
        bcrypt.compare(password, user.password, (err, result) => {
            if (result === true) {
                jwt.sign({user}, 'secretKey', {expiresIn: '1h'}, (err, token) => {
                    if (err) {
                        res.json(err)
                    } else {
                        res.json({
                            message: "Login successful",
                            token
                        })
                    }
                })
            } else {
                res.status(404).json('Invalid password')
            }
        })
    })
}

const registerUser = async (req, res) => {
    var { name, phone, password, type } = req.body;
    await hashPassword(password)
    .then((hashedPassword) => {
        var payload = {
            name: name,
            phone: phone,
            active: true,
            password: hashedPassword,
            created_at: Date.now(),
            updated_at: Date.now(),
            type: type
        }
        userModel.create(payload)
        .then(() => {
            res.status(200).json("User registered successfully")
        })
        .catch((err) => res.status(501).json("Unable to process user registration", err))
    })
    .catch((err) => res.status(401).json("Unable to process registration", err))
}


const viewCandidateDetails = async (req, res) => {
    var id = req.params.id;
    candidateModel.aggregate([
        {
            $lookup: {
                from: "interviews",
                localField: 'interview',
                foreignField: '_id',
                as: 'Interview_details'
            }
        }
    ])
    .then((result) => {
        result.forEach((val) => {
            if (val._id.toString() === id) {
                res.status(200).json(val)
            } else {
                res.status(404).json("Candidate detailsnot found")
            }
        })
    })
    .catch((err) => console.log(err))
}

module.exports = {
    seedDB,
    login,
    registerUser,
    viewCandidateDetails
}