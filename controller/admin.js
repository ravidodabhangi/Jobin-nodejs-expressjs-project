const adminSchema=require("../Model/AdminData")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const admin=async(req,res)=>{
    res.render("profile1/admin");  //admin register page
}

const AdminData=async(req,res)=>
{      let{username,email,password,confirmPassword}=req.body;
   try{  

    console.log(confirmPassword);
        const errors=validationResult(req)
        if(!errors.isEmpty())
        {   
        
            let alert=errors.array()
            
            console.log(alert);
        res.render('profile1/admin',{alert})

        }
        else
        {   
            let user=await adminSchema.findOne({email});
            
        
            if(user)
            {
                req.flash("ERROR_MSG","you are already registerd plz login");
                res.redirect("/profile/adminLogin",302,{});
            }
        
            else
            {
                // you are new user
                console.log(req.body);
                let newUser=new adminSchema({
                     username,
                      email,
                      password
                     });



                     bcrypt.genSalt(12,(err,salt)=>{
                        if(err)throw err;
                        bcrypt.hash(newUser.password,salt,async(err,hash)=>{
                            if(err)throw err;
                            console.log(hash);
                            newUser.password=hash;
                            console.log(newUser);
                          await newUser.save();
                        })
                       
                     });//generating salt
                    
                     
                     
                     req.flash('SUCCESS_MSG','REGISTERED SUCCESSFULLY');
                     res.redirect("/profile/adminLogin",302,{});
            }
            
        }
    }
    catch(error)
    {
        console.log(error);
    }
};

const adminLogin=async(req,res)=>{
    res.render("profile1/adminLogin");  //admin login page
}
const loginPost=async(req,res,next)=>{
    // passport authentication
    passport.authenticate("local",{
        successRedirect:"/user/create-user",
        failureRedirect:"/profile/adminLogin",
        failureFlash:true,
    })(req,res,next);
};
const logout=(req,res)=>{
    req.logout(()=>{});
    req.flash('SUCCESS_MSG',"successfully logout");
    res.redirect('/profile/adminLogin',302,{})
    }


module.exports={admin,AdminData,adminLogin,loginPost,logout}