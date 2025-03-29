const Request = require('../models/Request.model');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const { sendNewRequestEmail } = require('../utils/emailService');
// Create a new request (public)
const createRequest = async (req, res) => {
    try {
        const { email_address, phone_number, form_type } = req.body;

        // Convert form_type to lowercase
        const normalizedFormType = form_type.toLowerCase();

        // Validate form type
        const validFormTypes = ['study visa', 'work permit', 'visit visa'];
        if (!validFormTypes.includes(normalizedFormType)) {
            return res.status(400).json({
                message: 'Invalid form type. Must be one of: Study Visa, Work Permit, Visit Visa'
            });
        }

        // Check if there's already a pending request with this email
        const existingRequest = await Request.findOne({
            email_address,
            status: 'Pending'
        });

        if (existingRequest) {
            return res.status(400).json({
                message: 'You already have a pending request'
            });
        }

        const request = new Request({
            email_address,
            phone_number,
            form_type: normalizedFormType
        });

        await request.save();

        // Send email to admin
        await sendNewRequestEmail(process.env.ADMIN_EMAIL, request);

        res.status(201).json({
            message: 'Request submitted successfully',
            request
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating request',
            error: error.message
        });
    }
};

// Get all requests (admin only)
const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find()
            .sort({ createdAt: -1 })
            .populate('processed_by', 'username');
        res.json(requests);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching requests',
            error: error.message
        });
    }
};

// Get pending requests (admin only)
const getPendingRequests = async (req, res) => {
    try {
        const { formtype } = req.params;
        const requests = await Request.find({ status: 'Pending' , form_type : formtype })
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching pending requests',
            error: error.message
        });
    }
};

// Process a request (admin only)
const processRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status } = req.body;

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({
                message: 'Request not found'
            });
        }

        if (request.status !== 'Pending') {
            return res.status(400).json({
                message: 'This request has already been processed'
            });
        }

        request.status = status;
        request.processed_at = new Date();

        await request.save();

        let response = {
            message: 'Request processed successfully',
            request
        };

        // If approved, create a user account and include credentials in response
        if (status === 'Approved') {
            const username = `user_${request.email_address.split('@')[0]}`;
            const password = Math.random().toString(36).slice(-8); // Generate random password

       
            const user = new User({
                username,
                password : password, 
                contact_details: {
                    email_address: request.email_address,
                    phone_number: request.phone_number
                },
                form_type: request.form_type, // Already in lowercase from request creation
                approval_status : 'Approved'
            });

            await user.save();

            // Add credentials to response
            response.credentials = {
                username,
                password,
                message: 'Please share these credentials with the user securely'
            };
        }

        res.json(response);
    } catch (error) {
        res.status(500).json({
            message: 'Error processing request',
            error: error.message
        });
    }
};

// Get request by ID (admin only)
const getRequestById = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({
                message: 'Request not found'
            });
        }

        res.json(request);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching request',
            error: error.message
        });
    }
};


module.exports = {
    createRequest,
    getAllRequests,
    getPendingRequests,
    processRequest,
    getRequestById,
}; 