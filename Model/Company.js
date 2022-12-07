const { Schema, model } = require("mongoose");
const CompanySchema = new Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    company_type: {
      type: String,
      required: true,
    },
    company_location: {
      type: String,
      required: true,
    },
    company_employees: {
      type: String,
      required: true,
    },
    company_status: {
      type: String,
      required: true,
    },
    company_exp_tech: {
      type: String,
      required: true,
    },
    company_experience: {
      type: String,
      required: true,
    },
    company_job: {
      type: String,
      required: true,
    },
    company_job_type: {
      type: String,
      required: true,
    },
    company_image: {
      type: [""],
      required: true,
    },
    company_edu_dept: {
      type: String,
      required: true,
    },
    company_education: {
      type: String,
      required: true,
    },
    company_decription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("companyData", CompanySchema);
