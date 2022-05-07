const express = require('express')
const router = express.Router()

const upload = require('./storage.config');

const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const authMiddleware = require('../middlewares/auth.middleware')

router.post('/users', authMiddleware.isNotAuthenticated, upload.single('image'), authController.register)
router.post('/login', authMiddleware.isNotAuthenticated, authController.login)

router.get('/users/me', authMiddleware.isAuthenticated, userController.getCurrentUser)
router.get('/users/:id', userController.getUserById)
router.post('/users/snippet', authMiddleware.isAuthenticated, userController.saveSnippet);
router.delete('/users/snippet/:id', authMiddleware.isAuthenticated, userController.deleteSnippet);
router.put('/users/:id', authMiddleware.isAuthenticated, userController.editProfile);



module.exports = router