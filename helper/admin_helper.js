// module.exports = {
//     ensureAuthenticated: function (req, res, next) {
//       if (req.isAuthenticated()) {
//         return next();
//       } else {
//         req.flash("ERROR_MSG", "you are not authorized USER");
//         res.redirect("/profile/adminLogin", 302, {});
//         // res.send("you are not authorised")
//       }
//     },
//   };
