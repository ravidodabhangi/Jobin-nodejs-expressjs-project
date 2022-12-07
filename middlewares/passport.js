// //local strategy

// let authSchema = require('../Model/Auth')
// let bcrypt = require('bcryptjs')
// let LocalStrategy = require('passport-local').Strategy


// module.exports = (passport) =>
// {
//     passport.use(
//         new LocalStrategy({usernameField:"email"},
//         async (email, password, done )  =>
//          {
//             let user = await authSchema.findOne({email})
//            //user exist or not
//             if(!user){
//               return  done(null, false , {message: 'user does not exists in our records'})
//             }

//             //password match or not
            
//             //compare password
//             bcrypt.compare(password, user.password, (err, isMatch) =>
//             {
//                 if(err)throw err
//                 if(!isMatch){
//                    return done(null, false, {message:'Password not match'})
//                 }
//                 else{
//                     return done(null, user)
//                 }
//             })
//         })
//     ) 
//         //persist data
//     passport.serializeUser(function(user, done){
//         done(null, user.id)
//     })

//     // retrieve data
//     passport.deserializeUser(function(id, done){
//         authSchema.findById(id, function(err, user)
//         {
//             done(err, user)
//         })
//     })
// }



let localStrategy = require("passport-local").Strategy;
const adminSchema = require("../Model/AdminData");
const bcrypt = require("bcryptjs");
console.log(localStrategy);

module.exports = 
passport1 => {
  passport1.use(
    new localStrategy({usernameField:"email"}, 
    async function(
        email,
        password,
        done
    )
     {
        let user=await adminSchema.findOne({email});
        if(!user)
        {
           return done(null,false,{message:'User Does Not Exist'})
        }
          //compare password
          bcrypt.compare(password, 
            user.password, (err, isMatch)=>{
            if(err) throw err;
            if(!isMatch)
            {
               return done(null,false,{message:'Incorrect Passwords '})
            }
            else
            {
                return done(null,user);
            }
          });
     })
    );
    passport1.serializeUser(function (user, done) {
        done(null, user.id)
      }); //persist data
      passport1.deserializeUser(function (id, done) {
        adminSchema.findById(id, function (err, user) {
          done(err, user);
        });
      }); //get data from session
}