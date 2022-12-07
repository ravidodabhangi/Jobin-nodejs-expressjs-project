const{company}=require("../controller/company");
const{companyData,companyLogin,loginPost,logout}=require("../controller/company")
const express=require("express");
const router=express.Router();


const bodyParser=require("body-parser"); //importing body-parser
router.get("/company",company);
router.get("/companyLogin",companyLogin) // to display the adminLogin
router.route("/companyLogin").post(loginPost);
router.get("/logout",logout);
const urlencodedParser=bodyParser.urlencoded({extended:true});
const {check,validationResult}=require("express-validator"); //importing express validator 

router.post("/company",urlencodedParser,[
    check('username','username should not be empty').isLength({min:1}),
    check('email','please enter valid email id').isEmail(),
    check('email','email should not be empty').isLength({min:1}),
    check('password','password should be 6 character').isLength({min:6}),
   
       ],companyData);

module.exports=router;