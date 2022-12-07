const express=require("express");
const router=express.Router();

const {admin}=require("../controller/admin_auth");

router.route("/feed").get(admin)


// !exports
module.exports=router;