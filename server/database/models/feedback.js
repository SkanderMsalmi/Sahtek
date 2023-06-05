const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  communication: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  empathy: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  professionalism: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  effectiveness: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  remarks: {
    type: String,
  },
});
const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;

/*
Communication:

Did the therapist actively listen to you during your sessions?
Was the therapist clear and easy to understand when explaining things?
Did the therapist use language that you found respectful and appropriate?
Did the therapist respond to your questions and concerns in a timely manner?
Empathy:

Did the therapist show an understanding of your emotions and feelings?
Did the therapist make you feel comfortable sharing personal information?
Did the therapist show compassion and understanding?
Did the therapist help you feel understood and validated?
Professionalism:

Did the therapist maintain a professional demeanor throughout your sessions?
Did the therapist adhere to ethical and legal standards?
Did the therapist respect your privacy and confidentiality?
Did the therapist maintain appropriate boundaries?
Effectiveness:

Did the therapy help you achieve your goals?
Did the therapist provide you with tools and strategies to cope with your issues?
Did the therapist help you gain new insights into your thoughts and behaviors?
Did the therapy have a positive impact on your overall well-being?
*/
