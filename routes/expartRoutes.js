const express = require('express')
const router  = express.Router()
const { applyExpart, allExpart } = require('../Controllers/expartControllers')
const isLoggedIn = require('../middleware/isLoggedIn')


router.route('/applyExpart').post(isLoggedIn,applyExpart)

router.route('/allExpart').get(allExpart)

module.exports = router