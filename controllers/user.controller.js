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
                res.status(200).json(user)
            }
        })
        .catch(next);
};

module.exports.saveSnippet = (req, res, next) => {
    const newSnippet = req.body;

    Snippet.create(newSnippet)
        .then(snippetCreated => {
            res.status(201).json(snippetCreated);
        })
        .catch(next)
};