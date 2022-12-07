module.exports= {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        else {
            req.flash('ERROR_MESSAGES','you are not authorized user')
            res.redirect('/auth/login', 302, {})
        }
    }
}