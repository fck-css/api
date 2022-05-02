const mongoose = require('mongoose');

const snippetSchema = mongoose.Schema({
    toolType: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    code: {
        type: String,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;