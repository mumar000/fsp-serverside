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
    bank_statements: { type: String, required: true }
  },
  visa_history: {
    previous_visa_applications: { type: Boolean, required: true },
    visa_refusal: { type: Boolean, required: true },
    details_of_previous_visas: { type: String }
  },
  uploaded_documents: {
    passport_copy: { type: String, required: true },
    academic_transcripts: { type: String, required: true },
    admission_letter: { type: String, required: true },
    english_language_test_score: { type: String },
    statement_of_purpose: { type: String },
    police_clearance_certificate: { type: String },
    birth_certificate: { type: String },
    accommodation_confirmation: { type: String }
  },
  emergency_contact_information: {
    full_name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone_number: { type: String, required: true },
    email_address: { type: String, required: true }
  },
  study_gap_explanation: { type: String },
  language_proficiency: {
    native_language: { type: String, required: true },
    other_languages_spoken: { type: String },
    language_certification_details: { type: String }
  },
  declaration: {
    terms_and_conditions: { type: Boolean, required: true },
    digital_signature: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('StudyVisa', StudyVisaSchema);