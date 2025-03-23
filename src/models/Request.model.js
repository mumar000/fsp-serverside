const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    email_address: {
        type: String,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true
    },
    form_type: {
        type: String,
        required: true,
        enum: ['study visa', 'work permit', 'visit visa'],
        lowercase: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    processed_at: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema); 