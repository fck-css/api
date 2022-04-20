const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const authMiddleware = require('../middlewares/auth.middleware')

router.post('/users', authMiddleware.isNotAuthenticated, authController.register)
router.post('/login', authMiddleware.isNotAuthenticated, authController.login)

router.get('/users/me', authMiddleware.isAuthenticated, userController.getCurrentUser)
router.get('/users/:id', userController.getUserById)

module.exports = router