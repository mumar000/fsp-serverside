const mongoose = require('mongoose');

const VisitVisaSchema = new mongoose.Schema({
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
  travel_information: {
    country_of_visit: { type: String, required: true },
    purpose_of_visit: { type: String, required: true },
    intended_date_of_arrival: { type: Date, required: true },
    duration_of_stay: { type: String },
    address_during_stay: { type: String },
    contact_person_host: { type: String }
  },
  employment_details: {
    current_employment_status: { type: String, required: true },
    employer_name: { type: String },
    job_title: { type: String },
    work_address: { type: String },
    monthly_income: { type: String }
  },
  financial_details: {
    source_of_funding: { type: String, required: true },
    proof_of_funds: { type: String, required: true },
    sponsor_information: { type: String }
  },
  visa_history: {
    previous_visas_issued: { type: String, required: true },
    details_of_previous_visits: { type: String },
    visa_refusal: { type: String, required: true }
  },
  uploaded_documents: {
    bank_statement: { type: String, required: true },
    account_maintenance_certificate: { type: String, required: true },
    job_contract_letter: { type: String, required: true },
    leave_noc_from_employer: { type: String, required: true },
    salary_slips: { type: String, required: true },
    mrc: { type: String },
    frc: { type: String },
    corona_vaccination_card: { type: String, required: true },
    id_card_copy: { type: String, required: true },
    spouse_kids_details: { type: String },
    family_details: { type: String },
    passport_scan_copy: { type: String, required: true },
    property_assets_detail: { type: String }
  },
  declaration: {
    terms_and_conditions: { type: Boolean, required: true },
    digital_signature: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('VisitVisa', VisitVisaSchema);