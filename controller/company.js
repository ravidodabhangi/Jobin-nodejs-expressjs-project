const adminSchema = require("../Model/AdminData")
const {body,validationResult}=require('express-validator');
const bcrypt=require("bcryptjs");
const passport=require("passport");

const company=async(req,res)=>{
    res.render("profile1/company");
}

const companyData= async(req,res)=>{
    let{username,email,password,confirmpassword}=req.body;
    try{   
        const errors=validationResult(req)
            if(!errors.isEmpty())
            {   
            let alert=errors.array()
            res.render('profile1/company',{alert})
            }
            else
            {
             let user=await adminSchema.findOne({email});
            let pass=await adminSchema.findOne({password}); 
            
             if(user)
             {
                req.flash("ERROR_MSG","you are already registerd plz login");
                res.redirect("/profile/companyLogin",302,{}); 
             }
              else
              {
                let newUser=new adminSchema({
                     username,
                      email,
                      password
                     });
                     bcrypt.genSalt(12,(err,salt)=>{
                        if(err)throw err;
                        bcrypt.hash(newUser.password,salt,async(err,hash)=>{
                            if(err)throw err;
                            newUser.password=hash;
                          await newUser.save();
                        })
                       
                     });
                     //generating salt
                    req.flash('SUCCESS_MSG','REGISTERED SUCCESSFULLY');
                     res.redirect("/profile/companyLogin",302,{});
}
    }
}
    catch(error)
    {
        console.log(error);
    }
};
const companyLogin=async(req,res)=>{
    res.render("profile1/companyLogin");  //admin login page
}
const loginPost=async(req,res,next)=>{
    // passport authentication
    passport.authenticate("local",{
        successRedirect:"/user/create-user",
        failureRedirect:"/profile/companyLogin",
        failureFlash:true,
    })(req,res,next);
};
const logout=(req,res)=>{
    req.logout(()=>{});
    req.flash('SUCCESS_MSG',"successfully logout");
    res.redirect('/profile/companyLogin',302,{})
    }


module.exports={company,companyData,companyLogin,loginPost,logout}