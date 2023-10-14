const express = require('express')
const router  = express.Router()

const { hireExpert, takeInterview } = require('../Controllers/hrControllers')

router.route('/takeinterview').post(takeInterview)
router.route('/gethire').post(hireExpert)

module.exports = router;