const upload = require('../config/cloudinary');

// Middleware for handling multiple file uploads
const uploadDocuments = upload.fields([
    // Study Visa specific documents
    { name: 'passport_copy', maxCount: 1 },
    { name: 'academic_transcripts', maxCount: 1 },
    { name: 'admission_letter', maxCount: 1 },
    { name: 'english_language_test_score', maxCount: 1 },
    { name: 'statement_of_purpose', maxCount: 1 },
    { name: 'police_clearance_certificate', maxCount: 1 },
    { name: 'birth_certificate', maxCount: 1 },
    { name: 'accommodation_confirmation', maxCount: 1 },
    { name: 'bank_statements', maxCount: 1 },
    
    // Work Permit specific documents
    { name: 'passport_copy', maxCount: 1 },
    { name: 'academic_transcripts', maxCount: 1 },
    { name: 'english_language_test_score', maxCount: 1 },
    { name: 'work_experience_letters', maxCount: 1 },
    { name: 'job_offer_letter', maxCount: 1 },
    { name: 'medical_certificate', maxCount: 1 },
    { name: 'bank_statements', maxCount: 1 },
    
    // Visit Visa specific documents
    { name: 'bank_statement', maxCount: 1 },
    { name: 'account_maintenance_certificate', maxCount: 1 },
    { name: 'job_contract_letter', maxCount: 1 },
    { name: 'leave_noc_from_employer', maxCount: 1 },
    { name: 'salary_slips', maxCount: 1 },
    { name: 'mrc', maxCount: 1 },
    { name: 'frc', maxCount: 1 },
    { name: 'corona_vaccination_card', maxCount: 1 },
    { name: 'id_card_copy', maxCount: 1 },
    { name: 'spouse_kids_details', maxCount: 1 },
    { name: 'family_details', maxCount: 1 },
    { name: 'passport_scan_copy', maxCount: 1 },
    { name: 'property_assets_detail', maxCount: 1 }
]);

// Error handling middleware for file uploads
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File size too large. Maximum size is 5MB per file.'
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                message: 'Too many files uploaded. Please check the limits.'
            });
        }
    }
    next(err);
};

module.exports = {
    uploadDocuments,
    handleUploadError
}; 