const mongoose = require('mongoose');

const StudyVisaSchema = new mongoose.Schema({
    personal_information: {
        full_name: { type: String, required: true },
        gender: { type: String, required: true },
        date_of_birth: { type: Date, required: true },
        nationality: { type: String, required: true },
        passport_number: { type: String, required: true },
        passport_expiry_date: { type: Date, required: true }
    },
    contact_details: {
        email_address: { type: String, required: true },
        phone_number: { type: String, required: true },
        permanent_address: { type: String, required: true },
        current_address: { type: String }
    },
    academic_background: {
        highest_educational_qualification: { type: String, required: true },
        field_of_study: { type: String, required: true },
        institutions_attended: { type: String, required: true },
        year_of_graduation: { type: String, required: true },
        grades_marks_achieved: { type: String, required: true }
    },
    intended_study_program: {
        country_of_study: { type: String, required: true },
        university_college_name: { type: String, required: true },
        course_name: { type: String, required: true },
        duration_of_study: { type: String, required: true },
        intended_start_date: { type: Date, required: true },
        reason_for_choosing_program: { type: String }
    },
    financial_details: {
        source_of_funding: { type: String, required: true },
        sponsor_details: { type: String },
        bank_statements: { type: String, required: false } // URL to uploaded file
    },
    visa_history: {
        previous_visa_applications: { type: String, required: true },
        visa_refusal: { type: String, required: true },
        details_of_previous_visas: { type: String }
    },
    uploaded_documents: {
        passport_copy: { type: String, required: true }, // URL to uploaded file
        academic_transcripts: { type: String, required: true }, // URL to uploaded file
        admission_letter: { type: String, required: true }, // URL to uploaded file
        english_language_test_score: { type: String }, // URL to uploaded file
        statement_of_purpose: { type: String }, // URL to uploaded file
        police_clearance_certificate: { type: String }, // URL to uploaded file
        birth_certificate: { type: String }, // URL to uploaded file
        accommodation_confirmation: { type: String } // URL to uploaded file
    },
    emergency_contact_information: {
        full_name: { type: String, required: true },
        relationship: { type: String, required: true },
        phone_number: { type: String, required: true },
        email_address: { type: String, required: true },
        study_gap_explanation:{ type:String},
        native_language: { type: String, required: true },
        other_languages_spoken: { type: String },
        language_certification_details: { type: String }
    },
    declaration: {
        terms_and_conditions: { type: String, required: true },
        digital_signature: { type: String }
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('StudyVisa', StudyVisaSchema);