const express=require("express");
const router=express.Router();
let multer = require('multer');
let storage = require('../config/multer')
let upload = multer({ storage });

const {user,searchCompany,deletePost,postUserMain,userProfile,userHome,searchComp,
  GetUser,GetAllUsers,UpdateUser,UpdatedUser,CreateUser,companyObj,createComment,comment}=require("../controller/user_auth");



 router.route('/searchedCompany').get(searchComp)
router.post('/searchedCompany',searchCompany)
router.route("/create-user").get(GetUser);
router.route("/comment").get(comment);
router.post("/comment", createComment);
router.post("/create-user", CreateUser);
router.route("/get-users").get(GetAllUsers);


router.route("/feed").get(userHome)

router.route("/profile").get(user)
router.route("/update-user/:id").get(UpdateUser);
router.route("/update-user/:id").put(UpdatedUser);
router.route('/:id').delete(deletePost)
router.route("/:id").get(companyObj);


// router.route('/posts').get(postUser)
// router.post('/posts',postUserMain)

// router.route('/:id').delete(deleteProfile)

router.post(
  "/profile", upload.single("profile_img"),
  userProfile
);

router.post( "/feed",  upload.any(["post_img","post_video"]), postUserMain);


// !exports
module.exports=router;