const CompanySchema = require("../Model/Company");
const CompanyMailSchema = require("../Model/Mail");
// const {transport,options}=require("../public/js/mail")
// const {check, validationResult} = require('express-validator');
const nodemailer = require("nodemailer");
const companyInfo = async (req, res) => {
  res.render("profile/company");
};

let GetCompany = async (req, res) => {
  let companyData = await CompanySchema.find({}).lean();
  res.render("auth/companyObj", { companyData });
};

// let companySingleObj;
const companyObj = async (req, res) => {
  let companyData = await CompanySchema.find({}).lean();
  let companymailData = await CompanyMailSchema.find({}).lean();

  let companySingleObj = await CompanySchema.findOne({
    _id: req.params.id,
  }).lean();

  res.render("auth/companyList", {
    companySingleObj,
    companyData,
    companymailData,
  });
};
//todo-----------------email controller

const emailTrap = async (req, res) => {
  let companySingleObj = await CompanySchema.findOne({
    _id: req.params.id,
  }).lean();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "diamond.klein27@ethereal.email",
      pass: "NMFVYgu9pVwgPK3FUT",
    },
  });

  let info = await transporter.sendMail({
    from: `Fred Foo" <foo@example.com>`,
    to: `${companySingleObj.company_name}@example.com`,
    subject: "Job In",
    text: "Hello world?",
    html: `<b>Dear Sir  </br></br>  I am interested in applying for the ${companySingleObj.company_job} opportunity at ${companySingleObj.company_name}, please find attached my resume and cover letter for your consideration.</br></br>With ${companySingleObj.company_experience} years of experience in developer i have a verifiable history of ${companySingleObj.company_exp_tech}. i believe i would be a strong fit for this position</br></br>Thank you very much for reviewing my application. I look forward to hearing from you regarding next steps,</br></br>your sincerely,</br>XYZ</b></br><img src="cid:resumeImage"/>`,
    attachments: [
      {
        filename: "Resume.pdf",
        path: __dirname + "/../public/Resume.pdf",
      },
      {
        filename: "resumeImage.jpg",
        path: __dirname + "/../public/images/resumeImage.jpg",
        cid: "resumeImage",
      },
    ],
  });
  res.redirect("/company/getCompany", 301, {});
  console.log("Mail is send Successfully..........");
};
//todo-----------------email controller

let CreateCompany = async (req, res) => {
  let {
    company_name,
    company_type,
    company_location,
    company_employees,
    company_status,
    company_exp_tech,
    company_experience,
    company_job,
    company_job_type,
    company_edu_dept,
    company_education,
    company_decription,
  } = req.body;
  let company_image = req.files[0];
  await new CompanySchema({
    company_name,
    company_type,
    company_location,
    company_employees,
    company_status,
    company_exp_tech,
    company_experience,
    company_job,
    company_job_type,
    company_image,
    company_edu_dept,
    company_education,
    company_decription,
  }).save();
  req.flash("SUCCESS_MESSAGE", "successfully created");
  res.redirect("/company/getCompany", 301, {});
};

const company_update = async (req, res) => {
  let updateCompany = await CompanySchema.findOne({
    _id: req.params.id,
  }).lean();
  res.render("update/company_update", { updateCompany });
};

const company_update_put = async (req, res) => {
  await CompanySchema.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  ).lean();
  req.flash("SUCCESS_MESSAGE", "successfully updated");
  res.redirect("/company/getCompany", 301, {});
};

const companyDelete = async (req, res) => {
  await CompanySchema.deleteOne({ _id: req.params.id });
  req.flash("SUCCESS_MESSAGE", "successfully deleted");
  res.redirect("/company/getCompany", 301, {});
};

module.exports = {
  companyInfo,
  GetCompany,
  CreateCompany,
  companyObj,
  company_update,
  company_update_put,
  companyDelete,
  emailTrap,
};
