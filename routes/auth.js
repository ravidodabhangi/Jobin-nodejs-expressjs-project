let express = require('express')
let {registerPost, registertemplate,logintemplate,loginpost,logout,profile} = require('../controller/auth')
const { ensureAuthenticated } = require('../helper/auth_helper')
let router = express.Router()

router.get('/register', registertemplate)
router.get('/login', logintemplate)
router.get('/logout', logout)
router.get('/profile', ensureAuthenticated, profile)
router.route('/register').post(registerPost)
router.route('/login').post(loginpost)

module.exports = router