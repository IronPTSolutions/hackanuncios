const router = require('express').Router()

// Controllers
const miscController = require('../controllers/misc.controller')


// Misc urls
router.get('/', miscController.getHome)

// User registration

// User login

// Products

module.exports = router