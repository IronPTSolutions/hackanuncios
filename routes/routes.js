const router = require('express').Router()

// Instancia configurada del multer con cloudinary
const upload = require('../config/multer.config')

// Controllers
const miscController = require('../controllers/misc.controller')
const usersController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')

// Middlewares
const { isAuthenticated, isNotAuthenticated } = require('../middlewares/auth.middleware')


// Misc urls
router.get('/', miscController.getHome)

// User registration
router.get('/register', isNotAuthenticated, usersController.create)
router.post('/register', isNotAuthenticated, upload.single('image'), usersController.doCreate)

// User login
router.get('/login', isNotAuthenticated, authController.login)
router.post('/login', isNotAuthenticated, authController.doLogin)

router.get('/logout', isAuthenticated, authController.logout)

// Users
router.get('/profile', isAuthenticated, usersController.getUserProfile)

// Products

module.exports = router