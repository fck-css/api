const express = require('express')
const router = express.Router()

// Import Middlewares

const authController = require('../controllers/auth.controller')
//userController


// Routes
    //- Auth
router.post('/users', authController.create)

    //- User



module.exports = router