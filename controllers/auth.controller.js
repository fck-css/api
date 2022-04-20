const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

module.exports.register = (req, res, next) => {
    User.create(req.body)
        .then(userCreated => res.status(201).json(userCreated))
        .catch(next)
};

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

    const throwException = () => next(createError(401, 'Incorrect user or password!'));

    if (!email || !password) {
        return throwException();
    } else {
        User.findOne({ email })
            .then( user => {
                if (!user) {
                    throwException();
                } else {
                    return user.checkPassword(password)
                        .then(match => {
                            if (!match) {
                                throwException();
                            } else {
                                res.json({ 
                                    access_token: jwt.sign(
                                        {
                                            id: user.id
                                        },
                                        process.env.JWT_SECRET || 'changeme',
                                        {
                                            expiresIn: '1h'
                                        }
                                    )
                                })
                            }
                        })
                }
            })
            .catch(next);
    }
}