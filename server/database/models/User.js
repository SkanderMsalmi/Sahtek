const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    verified: {
        type: Boolean,
        default: false
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String }
    },
    phoneNumber: { type: String },
    emergencyContact: {
      name: { type: String },
      phoneNumber: { type: String }
    },
    medicalConditions: [{ type: String }],
    medications: [{ name: { type: String }, dosage: { type: String } }]
});

const TherapistSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    license: { type: String, required: true },
    specialty: { type: String, required: true },
    description: { type: String },
    availability: { type: String },
    education: [{ type: String }],
    experience: { type: String },
    languages: [{ type: String }],
    fees: { type: Number },
    ratings: [{ type: Number }],
    reviews: [{ type: String }],
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
  
});

const AppointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    notes: { type: String },
    status: { type: String, enum: ['Scheduled', 'Confirmed', 'Cancelled', 'Completed'], default: 'Scheduled' }
  });

  const Patient = mongoose.model('Patient', PatientSchema);
  const Therapist = mongoose.model('Therapist', TherapistSchema);
  const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = {Patient,Therapist,Appointment};