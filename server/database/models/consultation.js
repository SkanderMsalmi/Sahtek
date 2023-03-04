const mongoose = require('mongoose');

const ConsultationSchema= new mongoose.Schema({
    date: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    time: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    patientFile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientFile'
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }
});
const Consultation=mongoose.model('Consultation',ConsultationSchema)
module.exports=Consultation