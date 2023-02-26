const mongoose = require('mongoose')

const PatientFileSchema = mongoose.Schema({
    remarks: {
        type: String,
        required: true
    },
    consultation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultation'
    }
})
const PatientFile = mongoose.model('PatientFile', PatientFileSchema)
module.exports = PatientFile