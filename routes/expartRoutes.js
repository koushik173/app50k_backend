const express = require('express')
const router  = express.Router()
const { applyExpart, allExpart } = require('../Controllers/expartControllers')


router.route('/applyExpart').post(applyExpart)
router.route('/allExpart').get(allExpart)

module.exports = router