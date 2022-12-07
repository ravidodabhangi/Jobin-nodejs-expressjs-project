const userSchema=require("../Model/UserData")

const user=async(req,res)=>{
    res.render("profile1/user");
}


const userData= async(req,res)=>{
    try{   
           console.log(req.body);
           let{username,email,password,confirmpassword}=req.body;
           await new userSchema({
            username,
            email,
            password,
            confirmpassword
           }).save();
           req.flash('SUCCESS_MSG','REGISTERED SUCCESSFULLY');
           res.redirect("/",301,{});
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports={user,userData}