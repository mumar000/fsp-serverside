const express = require('express');
const router = express.Router();
const { 
    registerAdmin,
    loginAdmin,
    loginUser, 
    getAllUsers,
    submitForm,
    getUserForm
} = require('../controllers/user.controller');
const { uploadDocuments } = require('../middleware/upload.middleware');

router.post('/login', loginUser); 
router.post('/admin/login', loginAdmin); 
router.post('/admin/register', registerAdmin);
router.get('/getallusers', getAllUsers);
router.post('/form/submit', uploadDocuments, submitForm); 
router.get('/form', getUserForm); 

module.exports = router;