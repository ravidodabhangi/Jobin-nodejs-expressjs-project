let userSchema = require("../Model/User");
let userPost = require("../Model/UserPost");
const CompanySchema = require("../Model/Company");
let authSchema = require('../Model/Auth')
let UserProfileSchema = require('../Model/UserProfile')
let commentSchema = require('../Model/Comments')

let userHome =async (req,res) =>
{
  let AllUsers = await UserProfileSchema.find({}).lean();
    let profile = await userSchema.find({}).lean();
    let p1 = await userPost.find({}).lean()
    let user = await authSchema.find({}).lean();
    let comment = await commentSchema.find({}).lean()
  // console.log(comment)
     res.render('profile/user',{p1,user,profile,AllUsers,comment})   
}

let searchComp = async (req, res) => {
  res.render("searchedCompany/search");
};


let search;

let searchCompany =async (req,res) =>
{
  let {company_name} = req.body
  search = await CompanySchema.find({company_name}).lean()
  // console.log(search)
  // let search = await CompanySchema.find( {$or:[{company_job:{$in:[company_name]}},{company_name:{$in:[company_name]}}]}).lean()
    res.render('searchedCompany/search',{search})
    // res.redirect('/company/getCompany',301,{})
}

//todo-----------------------------
let searchCompanys = async (req, res) => {
  let companySingleObj = await CompanySchema.findOne({
    _id: req.params.id,
  }).lean();
  // console.log(companySingleObj)
  console.log(search)
  res.render("searchedCompany/companySearch", { search, companySingleObj });
};
//todo----------------------------

// pending
// let postUser = async (req, res) => {
//   let profile = await userSchema.find({}).lean();
//   // console.log(profile[0].profile_img[0].path)
//   let post1 = await userPost.find({}).lean();
//   res.render("userProfile/posts", { post1, profile });
// };
// pending


const user=async(req, res)=>{
  let AllUsers = await UserProfileSchema.find({}).lean();
  let profile = await userSchema.find({}).lean();
  res.render('userProfile/profile',{profile,AllUsers})
}

// let deleteProfile =
//   ("/:id",
//   async (req, res) => {
//     await userSchema.deleteOne({ _id: req.params.id });
//     res.redirect("/user/profile", 301, {});
//   });

let deletePost = ('/:id', async (req,res) =>
{
    await userPost.deleteOne({_id:req.params.id})
    res.redirect('/user/feed',301 , {})
})


let userProfile = async (req, res) => {
  try {
    let profile_img = req.file;
    await new userSchema({
      profile_img,
    }).save();
    res.redirect("/user/profile", 301, {});
  } catch (error) {
    console.log(error);
  }
};

let postUserMain = async(req,res) =>
{
    try {
        let post_img = req.files[0]
        let post_video = req.files[1]
        // console.log(req.files)
        let {post} = req.body;
        await new userPost({
          post,post_img,post_video
        }).save()
        res.redirect('/user/feed',301,{})
        
    } catch (error) {
        console.log(error)
    }
}


const GetUser = async (req, res) => {
  res.render("user_profile/create-user");
};


const GetAllUsers = async (req, res) => {
  let AllUsers = await UserProfileSchema.find({}).lean();
  res.render("user_profile/get-users", { AllUsers })
};

const UpdateUser=async(req, res)=>{
    let Updateuser=await UserProfileSchema.findOne({_id:req.params.id}).lean();
    res.render("user_profile/update-user", {Updateuser});
};
const UpdatedUser=async(req, res)=>{
    await UserProfileSchema.updateOne({_id:req.params.id}, {$set:req.body}).lean()
    res.redirect("/user/profile", 301 ,{})
}


let CreateUser = async (req, res) => {

  try {
    console.log(req.body.name)
    let { name, designation, idustry, education, country, city } = req.body;
     let payload = { name,
      designation,
      idustry,
      education,
      country,
      city,}
    await new UserProfileSchema(payload).save();
    // res.end("successfully data user created");
    res.redirect("/user/profile", 301, {});
  } catch (error) {
    console.log(error)
  }

 
};



let createComment = async (req,res) =>
{
  try {

    // let comment_list = req.file
    let {comment,comments} = req.body
    let payload ={comment,comments}
    await new commentSchema(payload).save();
    res.redirect('/user/comment',301,{})
  } catch (error) {
    console.log(error)
  }
}

let comment = async (req,res) =>
{

  let comment = await commentSchema.updateOne({_id: req.params.id},{$push:{comments:req.body.comments}})
  console.log(comment)
  res.render('profile/comments',{comment})
}

const companyObj = async (req, res) => {
  let companyData = await CompanySchema.find({}).lean();

  let companySingleObj = await CompanySchema.findOne({
    _id: req.params.id,
  }).lean();
  res.render("searchedCompany/companyList", { companySingleObj ,companyData});
};

module.exports={searchCompanys,user,deletePost,userProfile,userHome,searchCompany,searchComp,postUserMain,
  GetUser,GetAllUsers,UpdateUser,UpdatedUser,CreateUser,companyObj,comment,createComment}