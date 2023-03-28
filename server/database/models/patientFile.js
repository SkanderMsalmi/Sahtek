const mongoose = require('mongoose')

const PatientFileSchema = mongoose.Schema({
    title:{
        type: String,
    },
    remarks: {
        type: String,
        required: true
    },
    // consultation: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Consultation'
    // },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    
    therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: String,
        required: true

    },
})
const PatientFile = mongoose.model('PatientFile', PatientFileSchema)
module.exports = PatientFile