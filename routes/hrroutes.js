const express = require('express')
const router  = express.Router()

const { hireExpert, takeInterview } = require('../Controllers/hrControllers')
const isLoggedIn = require('../middleware/isLoggedIn')

router.route('/takeinterview').post(isLoggedIn,takeInterview)
router.route('/gethire').post(isLoggedIn,hireExpert)

module.exports = router;