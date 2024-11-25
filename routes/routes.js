const router = require('express').Router()

// Instancia configurada del multer con cloudinary
const upload = require('../config/multer.config')

// Controllers
const miscController = require('../controllers/misc.controller')
const usersController = require('../controllers/users.controller')


// Misc urls
router.get('/', miscController.getHome)

// User registration
router.get('/register', usersController.create)
router.post('/register', upload.single('image'), usersController.doCreate)

// User login

// Products

module.exports = router