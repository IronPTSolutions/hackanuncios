const router = require('express').Router()

// Instancia configurada del multer con cloudinary
const upload = require('../config/multer.config')

// Controllers
const miscController = require('../controllers/misc.controller')
const usersController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')


// Misc urls
router.get('/', miscController.getHome)

// User registration
router.get('/register', usersController.create)
router.post('/register', upload.single('image'), usersController.doCreate)

// User login
router.get('/login', authController.login)
router.post('/login', authController.doLogin)

// Products

module.exports = router