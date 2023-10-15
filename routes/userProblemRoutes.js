const express = require('express')
const router  = express.Router()
const { updateProblem, deleteProblem, getProblem, createProblem, selectExpert } = require('../Controllers/problemControllers')
const isLoggedIn = require('../middleware/isLoggedIn')

// const { userLimiter, routeLimiter } = require('../middleware/limiterMid')

router.route('/create').post(isLoggedIn,createProblem)
router.route('/update/:problemId').put(isLoggedIn, updateProblem)
router.route('/delete/:problemId').delete(isLoggedIn, deleteProblem)
router.route('/getProblem/:creatorId').get(isLoggedIn,getProblem)

router.route('/selectExpert').post(isLoggedIn,selectExpert)


module.exports = router