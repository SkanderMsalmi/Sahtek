const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
    remarks: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    consultation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultation'
    }
})
const Feedback = mongoose.model('Feedback', FeedbackSchema)
module.exports = Feedback