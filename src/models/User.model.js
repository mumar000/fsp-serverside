const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username provided by admin 
  password: { type: String, required: true }, // Password provided by admin
  contact_details: {
    email_address: { type: String}, // User's email  (we will take it while requesting)
    phone_number: { type: String} // User's phone number (we will take it while requesting)
  },
  isAdmin: { type: Boolean, default: false }, // To distinguish between admin and regular users
  form_type: { 
    type: String, 
    // required: function() { return !this.isAdmin }, // Only required for non-admin users
    enum: ['study visa', 'work permit', 'visit visa'], // Only these three options are allowed
    lowercase: true // Ensure form_type is always stored in lowercase
  },
  form_reference: { 
    type: mongoose.Schema.Types.ObjectId, 
    // required: function() { return !this.isAdmin }, // Only required for non-admin users
    refPath: 'form_type' 
  },
  approval_status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], // Approval status options
    default: 'Pending' // Default status is "Pending"
  },
  admin_comments: { 
    type: String, // Admin can add comments for approval/rejection
    default: '' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);