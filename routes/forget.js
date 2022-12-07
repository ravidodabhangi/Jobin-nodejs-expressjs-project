const express=require("express");
const {forget,resetPost}=require("../controller/forget")
const router=express.Router();
router.get("/forget",forget);
router.route("/forget").post(resetPost);
module.exports=router;