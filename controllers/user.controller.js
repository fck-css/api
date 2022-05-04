const createError = require("http-errors");
const User = require("../models/User.model");
const Snippet = require("../models/Snippet.model");

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
    Snippet.create(req.body)
        .then(snippetCreated => {
            console.log(snippetCreated)
            res.status(201).json(snippetCreated);
        })
        .catch(next)
};