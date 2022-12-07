const{admin, loginPost,logout}=require("../controller/admin");
const{AdminData,adminLogin}=require("../controller/admin")
const { ensureAuthenticated } = require("../helper/admin_helper");
const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser"); //importing body-parser
router.get("/admin",admin); // to display the page (admin register)
router.get("/adminLogin",adminLogin) // to display the adminLogin

router.route("/adminLogin").post(loginPost);
router.get("/logout", logout);
const urlencodedParser=bodyParser.urlencoded({extended:false});
const {check,validationResult}=require("express-validator"); //importing express validator 
// adding code for express validator
router.post("/admin",urlencodedParser,[
    check('username','username should not be empty').isLength({min:1}),
    check('email','please enter valid email id').isEmail(),
    check('email','email should not be empty').isLength({min:1}),
    check('password','password should be 6 character').isLength({min:6}),
   
       ],AdminData);


module.exports=router;
