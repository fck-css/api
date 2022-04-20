const createError = require("http-errors")
const User = require("../models/User.model")

module.exports.getUserById = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                next(createError(404, 'User not found!'));
            } else {
                res.status(200).json(user);
            }
        })
        .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
    User.findById(req.currentUser)
        .then(user => {
            if (!user) {
                next(createError(404, 'User not found!'))
            } else {
                res.status(400).json(user)
            }
        })
        .catch(next);
};