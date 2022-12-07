const{user}=require("../controller/user");
const express=require("express");
const {userData}=require("../controller/user");
const router=express.Router();


router.get("/user",user)
router.route("/user").post(userData)

module.exports=router;