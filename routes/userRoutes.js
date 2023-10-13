const express = require('express')
const router = express.Router()

router.route('/home').get((req, res)=>{
    res.send('hello from roy home');
});

module.exports = router;