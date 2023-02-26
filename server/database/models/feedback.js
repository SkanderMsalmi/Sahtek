const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
    remarks: {
        type: String,
        required: true
    },
    consultation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultation'
    }
})
const Feedback = mongoose.model('Feedback', FeedbackSchema)
module.exports = Feedback