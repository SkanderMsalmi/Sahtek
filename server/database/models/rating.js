const mongoose = require("mongoose");

const RatingSchema = mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
