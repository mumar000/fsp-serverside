const User = require('../models/User.model');
const StudyVisa = require('../models/studyVisa.model');
const WorkPermit = require('../models/workPermit.model');
const VisitVisa = require('../models/visitVisa.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendFormSubmissionConfirmationMail, sendWelcomeEmail } = require('../utils/emailService');

// Admin Registration
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await User.findOne({ username, isAdmin: true });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin user
        const admin = new User({
            username,
            password: hashedPassword,
            isAdmin: true
        });

        await admin.save();

        // Create token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, isAdmin: true },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Admin created successfully',
            token,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
};

// Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin user
        const admin = await User.findOne({ username, isAdmin: true });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, isAdmin: true },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Admin login successful',
            token,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Regular User Login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username, isAdmin: false });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check password
        const isMatch = password === user.password  ;
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check if user is approved
        if (user.approval_status !== 'Approved') {
            return res.status(403).json({ message: 'Your account is not approved yet' });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, username: user.username, isAdmin: false },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

         //sending welcome message
        await sendWelcomeEmail(user.contact_details.email_address);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                form_type: user.form_type
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Submit visa form
const submitForm = async (req, res) => {
    try {
        const userId = req.user.id;
        const formData = req.body;

        // Get user and check if they already have a form submission
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is approved
        if (user.approval_status !== 'Approved') {
            return res.status(403).json({ message: 'Your account is not approved yet' });
        }

        // Check if user already has a form submission
        if (user.form_reference) {
            return res.status(400).json({ message: 'You have already submitted a form' });
        }

        // Process uploaded files
        const files = req.files;
        if (!files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Create document URLs object
        const documentUrls = {};
        Object.keys(files).forEach(key => {
            documentUrls[key] = files[key][0].path;
        });

        let formSubmission;
        // Create form submission based on form type
        switch (user.form_type) {
            case 'study visa':
                formSubmission = new StudyVisa({
                    ...formData,
                    uploaded_documents: documentUrls,
                    financial_details: {
                        ...formData.financial_details,
                        bank_statements: documentUrls.bank_statements
                    }
                });
                break;
            case 'work permit':
                formSubmission = new WorkPermit({
                    ...formData,
                    uploaded_documents: documentUrls
                });
                break;
            case 'visit visa':
                formSubmission = new VisitVisa({
                    ...formData,
                    uploaded_documents: documentUrls
                });
                break;
            default:
                return res.status(400).json({ message: 'Invalid form type' });
        }

        // Save the form submission
        await formSubmission.save();

        // Update user with form reference
        user.form_reference = formSubmission._id;
        await user.save();

        await sendFormSubmissionConfirmationMail(user.contact_details.email_address , user.form_type);

        res.status(201).json({
            message: 'Form submitted successfully',
            form: formSubmission
        });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting form', error: error.message });
    }
};

// Get user's form submission
const getUserForm = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('form_reference');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.form_reference) {
            return res.status(404).json({ message: 'No form submission found' });
        }

        res.json(user.form_reference);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching form', error: error.message });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    loginUser,
    getAllUsers,
    submitForm,
    getUserForm
};