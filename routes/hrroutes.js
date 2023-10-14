const express = require('express')
const { getInterview, hireExpart } = require('../Controllers/hrControllers')
const router  = express.Router()

router.route('/takeinterview').post(getInterview)
router.route('/gethire').post(hireExpart)