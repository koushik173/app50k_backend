const express = require('express')
const router  = express.Router()
const { applyExpert, allExpert, allExpertTypes, allExpertSearch } = require('../Controllers/expertControllers')
const isLoggedIn = require('../middleware/isLoggedIn')


router.route('/applyExpert').post(isLoggedIn,applyExpert)

router.route('/allExpert').get(isLoggedIn,allExpert)

router.route('/allExpertTypes').get(isLoggedIn,allExpertTypes)

router.route('/allExpertSearch').post(isLoggedIn,allExpertSearch)



module.exports = router