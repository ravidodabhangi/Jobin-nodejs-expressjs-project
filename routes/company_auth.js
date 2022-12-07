const express = require("express");

const multer = require("multer");
const storage = require("../config/companyMulter");

const {
  companyInfo,
  GetCompany,
  CreateCompany,
  companyObj,
  company_update,
  company_update_put,
  companyDelete,
  emailTrap,
} = require("../controller/company_auth");
const { searchCompanys } = require("../controller/user_auth");
const router = express.Router();
let upload = multer({ storage });

router.route("/feed").get(companyInfo);
router.route("/getCompany").get(GetCompany);
router.get("/update/:id", company_update);
router.put("/update/:id", company_update_put);
router.route("/delete/:id").delete(companyDelete);
router.route("/mail/:id").get(emailTrap);
router.post("/feed", upload.any(["company_image"]), CreateCompany);

router.route("/:id").get(companyObj);
router.route("/object/:id").get(searchCompanys);

// !exports
module.exports = router;
