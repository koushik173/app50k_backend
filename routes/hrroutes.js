const express = require('express')
const router  = express.Router()

const { hireExpart, takeInterview } = require('../Controllers/hrControllers')

router.route('/takeinterview').post(takeInterview)
router.route('/gethire').post(hireExpart)

module.exports = router;