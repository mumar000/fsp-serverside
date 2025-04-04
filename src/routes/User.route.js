const express = require('express');
const router = express.Router();
const { 
    registerAdmin,
    loginAdmin,
    loginUser, 
    getAllUsers,
    submitForm,
    getUserForm,
    getAllForms
} = require('../controllers/User.controller');
const { uploadDocuments } = require('../middleware/upload.middleware');
const auth = require('../middleware/auth.middleware')

router.post('/login', loginUser); 
router.post('/admin/login', loginAdmin); 
router.post('/admin/register', registerAdmin);
router.get('/getallusers', getAllUsers);
router.post('/form/submit',auth, uploadDocuments, submitForm); 
router.get('/form/:user', getUserForm); // get form by user id
router.get('/all/forms/:formtype', getAllForms); // get all form by form type


module.exports = router;