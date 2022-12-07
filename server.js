const express = require("express");
const { engine } = require("express-handlebars");
const { PORT, MONGODB_URL } = require("./config/index");
let passport = require('passport')
let authRoute = require('./routes/auth') 
const adminRoute = require("./routes/admin_auth");
const companyRoute = require("./routes/company_auth");
const userRoute = require("./routes/user_auth");
const adminRoute1 = require("./routes/admin");
const userRoute1 = require("./routes/user");
const companyRoute1 = require("./routes/company");
// -------------forget-----------------------
const forgetRoute=require("./routes/forget")
//--------------------------------------------------
let methodOverride = require('method-override')
const { connect } = require("mongoose");
const Handlebars = require("handlebars");
// const { ensureAuthenticated } = require('./helper/auth_helper')
require('./middlewares/passport')(passport);

const app = express();


let session = require('express-session')
let flash = require('connect-flash')
// set static files;
app.use(express.static(__dirname + "/public"));
// hanldebars setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// body parser urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// Home page || Base page
app.use(
  session({
  secret:'rupesh',
  resave: true,
  saveUninitialized: false,
}))

app.use(flash())
//passport middleware initialization
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req,res,next)
{
  res.locals.SUCCESS_MESSAGES = req.flash("SUCCESS_MESSAGES")
  res.locals.ERROR_MESSAGES = req.flash("ERROR_MESSAGES")
  res.locals.INFO_MESSAGES = req.flash("INFO_MESSAGES")
  // res.locals.errorAuth = req.flash("error")
  // res.locals.user = req.user || null
  res.locals.SUCCESS_MSG = req.flash("SUCCESS_MSG");
  res.locals.ERROR_MSG = req.flash("ERROR_MSG");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next()
})


// Mounting
app.use("/admin", adminRoute);
app.use("/company", companyRoute);
app.use("/user", userRoute);
app.use('/auth', authRoute)
app.use("/profile", adminRoute1); // for adminPage
app.use("/profile", userRoute1);  //for userPage
app.use("/profile", companyRoute1); // for companyPage
//---------------------------forget password--------------------------------
app.use("/profile",forgetRoute); // for forgetPage


Handlebars.registerHelper("trimString", str => {
  let string = [...str].splice(6).join("");
  return new Handlebars.SafeString(string);
});

// !---------  Start server    --------------------

let startServer = async () => {
  try {
    await connect(MONGODB_URL);
    console.log("MongoDB connected successfully");

    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log("Server is listening port number", +PORT);
    });   
  } catch (error) {
    console.error(error);
  }
};
startServer();


app.get("/", (req, res) => {
 
  res.render('home')
});

