const User = require('../models/User.model');

module.exports.create = (req, res, next) => {
    User.create(req.body)
        .then(userCreated => res.status(201).json(userCreated))
        .catch(next)
};