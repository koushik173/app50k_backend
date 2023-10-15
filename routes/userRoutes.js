const express = require('express')
const router = express.Router()

const {signup, login, logout, alluser, userVerify} = require('../Controllers/userControllers')
const {validateSignUp, validateLogin} = require('../middleware/validateInput');
const isLoggedIn = require('../middleware/isLoggedIn');

router.route('/home').get((req, res)=>{
    res.send('hello from roy home');
});

router.route('/signup').post(validateSignUp, signup)
router.route('/login').post(validateLogin, login)
router.route('/logout').get(isLoggedIn,logout)
router.route('/:id/verify/:token/').get(userVerify)

router.route('/allUser').get(alluser)

module.exports = router;