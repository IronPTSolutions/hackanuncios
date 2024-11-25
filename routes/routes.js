const router = require('express').Router()

// Controllers
const miscController = require('../controllers/misc.controller')
const usersController = require('../controllers/users.controller')


// Misc urls
router.get('/', miscController.getHome)

// User registration
router.get('/register', usersController.create)
router.post('/register', usersController.doCreate)

// User login

// Products

module.exports = router