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
        .populate('snippets')
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

module.exports.deleteSnippet = (req, res, next) => {
    Snippet.findByIdAndDelete(req.params.id)
        .then((response) => {
            res.status(202);
        })
        .catch(next)
};

module.exports.editProfile = (req, res, next) => {
    if (req.file) {
        req.body.image = req.file.path;
    
        User.findByIdAndUpdate(req.user.id, { image: req.body.image, name: req.body.name})
            .then((profileUpdated) => {
                res.status(200).json(profileUpdated);
            })
            .catch(next);
    } else {
        User.findByIdAndUpdate(req.params.id, { name: req.body.name })
            .then((profileUpdated) => {
                res.status(200).json(profileUpdated);
            })
            .catch(next)
    }
};