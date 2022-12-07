const adminSchema=require("../Model/AdminData")
const bcrypt=require("bcryptjs");

const forget=async(req,res)=>
{
    res.render("profile1/forget")
}

const resetPost=async(req,res)=>{
    let{newmail}=req.body;
    let emailUp=await adminSchema.find({newmail}).lean();
    emailUp.forEach(async (e)=>{
        let{email,password}=e;
       
        if(req.body.newmail === e.email)
        {  

             if(req.body.newpassword === req.body.confirmPassword)
             {
                console.log(email);
                console.log(req.body.newmail);
                bcrypt.genSalt(12,(err,salt)=>{
                    if(err)throw err;
                    bcrypt.hash(req.body.newpassword,salt,async(err,hash)=>{
                        if(err)throw err;
                        console.log(hash);
                        req.body.newpassword=hash;
                        let newValue=await adminSchema.updateOne({email:req.body.newmail},{$set:{password:req.body.newpassword}})
                        req.flash("SUCCESS_MSG","PASSWORD CHANGE")
                        res.redirect("/",301,{});
                    })
                })

               
             }
             else
             {
                res.end("rematch your password");
             }
        }    })
}


module.exports={forget,resetPost}