const mongoose = require('mongoose');

const WorkPermitSchema = new mongoose.Schema({
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
  skills_and_qualifications: {
    educational_background: { type: String, required: true },
    relevant_certifications: { type: String, required: true },
    languages_spoken: { type: String, required: true },
    work_experience: { type: String, required: true },
    special_skills: { type: String }
  },
  visa_history: {
    previous_visa_applications: { type: Boolean, required: true },
    visa_refusal: { type: Boolean, required: true },
    details_of_previous_visas: { type: String }
  },
  uploaded_documents: {
    passport_copy: { type: String, required: true },
    academic_transcripts: { type: String, required: true },
    english_language_test_score: { type: String }
  },
  emergency_contact_information: {
    full_name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone_number: { type: String, required: true },
    email_address: { type: String, required: true }
  },
  declaration: {
    terms_and_conditions: { type: Boolean, required: true },
    digital_signature: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('WorkPermit', WorkPermitSchema);