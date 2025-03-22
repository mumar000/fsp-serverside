const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username provided by admin 
  password: { type: String, required: true }, // Password provided by admin
  contact_details: {
    email_address: { type: String, required: true }, // User's email  (we will take it while requesting)
    phone_number: { type: String, required: true } // User's phone number (we will take it while requesting)
  },
  form_type: { 
    type: String, 
    required: true, 
    enum: ['Study Visa', 'Work Permit', 'Visit Visa'] // Only these three options are allowed
  },
  form_reference: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    refPath: 'form_type' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);