const mongoose = require('mongoose');
const { sendNewRequestEmail, sendStatusUpdateEmail } = require('../utils/emailService');

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


//not working so removed

// // Send email to admin when new request is created
// RequestSchema.post('save', async function(doc) {
//     if (doc.isNew) {
//         await sendNewRequestEmail(process.env.ADMIN_EMAIL, doc);
//     }
// });

// Send email to requester when status changes
RequestSchema.pre('save', async function(next) {
    if (this.isModified('status')) {
        await sendStatusUpdateEmail(this.email_address, this.status);
    }
    next();
});

module.exports = mongoose.model('Request', RequestSchema); 