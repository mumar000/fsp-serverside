const express = require('express');
const router = express.Router();
const {
    createRequest,
    getAllRequests,
    getPendingRequests,
    processRequest,
    getRequestById
} = require('../controllers/request.controller');
const auth = require('../middleware/auth.middleware');


// Protected routes (admin only)
router.post('/', createRequest);
router.get('/',  getAllRequests);
router.get('/pending/:formtype',  getPendingRequests);
router.get('/:requestId',  getRequestById);
router.post('/:requestId/process', processRequest);

module.exports = router; 