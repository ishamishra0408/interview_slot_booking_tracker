var fs = require("fs");
const candidateModel = require("../models/candidate");

const createCandidate = (req, res) => {
    const { name, phone, availability_slots } = req.body;
    console.log(req.body);
    console.log(req.file);
    if (req.file.mimetype != 'application/pdf') {
        res.status(404).json("File uploaded is not a pdf file")
    } else {
        var payload = {
            name,
            phone,
            resume_link: null,
            created_at: Date.now(),
            updated_at: Date.now(),
            availability_slots,
        }
        candidateModel.create(payload)
        .then((result) => {
            res.status(200).json("Candidate created successfully");
            var fileName = result._id + '_' + Date.now() + '.pdf';
            fs.writeFile(`./uploads/${fileName}`, req.file.buffer, (err) => {
                if (err) throw err;
                candidateModel.findOneAndUpdate({_id: result._id}, {$set: {resume_link: `./uploads/${fileName}`}})
                .then(() => console.log("Updated"))
                .catch((err) => console.log(err))
            })
        })
        .catch((err) => res.status(501).json("Unable to create candidate", err)) 
    }
}

const addAvailabilitySlot = async (req, res) => {
    const { new_slots } = req.body;
    await candidateModel.findOne({_id: req.params.id})
    .then((user) => {
        const userAvailableSlot = user.availability_slots
        new_slots.forEach((slot) => {
            userAvailableSlot.push(slot)
        })
        candidateModel.findOneAndUpdate({_id: req.params.id}, {$set: {availability_slots: userAvailableSlot}})
        .then(() => {
            res.status(200).json("Available slot added successfully")
        })
        .catch((err) => res.status(501).json("Unable to add available slot", err))
    })
}

const deleteAvailabilitySlot = async (req, res) => {
    const { slotToDelete } = req.body
    await interviewerSlotModel.findOne({_id: req.params.i})
    .then((result) => {
        var userSlots = result.availability_slots;
        var filteredArray = userSlots.filter(e => e !== slotToDelete);
        interviewerSlotModel.findOneAndUpdate({_id: req.params.id}, {$set: {availability_slots: filteredArray}})
        .then(() => {
            res.status(200).json("Slot removed successfully")
        })
        .catch((err) => res.status(501).json("Unable to remove slot", err))
    })
}

module.exports = {
    createCandidate,
    addAvailabilitySlot,
    deleteAvailabilitySlot
};