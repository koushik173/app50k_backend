const express = require('express')
const router  = express.Router()
const { applyExpart, allExpart } = require('../Controllers/expartControllers')
const { validexpartApp } = require('../middleware/validateInput')


router.route('/applyExpart').post(validexpartApp,applyExpart)
router.route('/allExpart').get(allExpart)

module.exports = router