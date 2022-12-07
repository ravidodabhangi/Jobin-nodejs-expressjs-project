let authSchema = require('../Model/Auth')
let bcrypt = require('bcryptjs')
let passport = require('passport')


let profile = async (req, res) =>
{
    
    res.render('profile/user')
} 
//get request
let registertemplate = (req, res)=>
{
    res.render('auth/register')
}


// let findUser = async (req,res) =>
// {
//     let user = await authSchema.findOne({}).lean()
//     console.log(user)
    
// }


//post request
let registerPost = async (req,res) =>
{
    let {username,email,password,confirmpassword} = req.body
    try {
        let errors = []
        if(!username)
        {
            errors.push({text:"username is required"})
        }
        if(!email)
        {
            errors.push({text:"email is required"})
        }
        if(!password)
        {
            errors.push({text:"password is required"})
        }
        if(password != confirmpassword)
        {
            errors.push({text:"passowrd not match"})
        }

        if(errors.length > 0)
        {
            res.render('auth/register',{
               errors,
               username,
               email,
               password,
               confirmpassword, 
            })
        }
        else
        {
            //old user
            let user = await authSchema.findOne({email})
            console.log(user)
           if(user)
           {
            req.flash('ERROR_MESSAGES', 'email is already registered')
            res.redirect('/auth/register',302, {})
        }
        
        else {
            // new user
            
            let newUser = await authSchema.create(
                {
                    username,
                    email,
                    password,
                })
           
            //use crypto module
            bcrypt.genSalt(12, (err,salt)=>
            {
                if(err) throw err
                bcrypt.hash(newUser.password, salt , async (err, hash)=>
                {
                    if(err) throw err
                    newUser.password = hash
                    console.log(hash)
                    await newUser.save()
                    req.flash('SUCCESS_MESSAGES',"successfully registered")
                    res.redirect('/auth/register', 302, {})
                })
            })
        }
           
        }
    } catch (error) {
        console.log(error)
    }
}

let logintemplate = (req, res)=>
{
    res.render('auth/login')
}

let loginpost = (req,res,next)=>
{
    passport.authenticate('local',{
      successRedirect:'/',
        failureRedirect:'/auth/login',
        failureFlash:true,
    })(req,res,next);
}


let logout = (req, res) =>
{
    req.logout(()=> {});
    req.flash("SUCCESS_MESSAGES","successfully logged out")
    res.redirect('/auth/login', 302, {})

}

module.exports = {registerPost, registertemplate,logintemplate,loginpost,logout,profile}