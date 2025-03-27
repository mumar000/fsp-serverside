const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Send email to admin for new request
const sendNewRequestEmail = async (adminEmail, requestData) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: adminEmail,
        subject: 'New Visa Request Received',
        html: `
            <h2>New Visa Request Received</h2>
            <p>A new visa request has been submitted with the following details:</p>
            <ul>
                <li>Email: ${requestData.email_address}</li>
                <li>Phone: ${requestData.phone_number}</li>
                <li>Form Type: ${requestData.form_type}</li>
            </ul>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Admin notification email sent successfully');
    } catch (error) {
        console.error('Error sending admin notification email:', error);
    }
};

// Send status update email to requester
const sendStatusUpdateEmail = async (requesterEmail, status) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: requesterEmail,
        subject: 'Visa Request Status Update',
        html: `
            <h2>Visa Request Status Update</h2>
            <p>Your visa request status has been updated to: <strong>${status}</strong></p>
            <p>Please log in to your account to view more details.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Status update email sent successfully');
    } catch (error) {
        console.error('Error sending status update email:', error);
    }
};

module.exports = {
    sendNewRequestEmail,
    sendStatusUpdateEmail
}; 