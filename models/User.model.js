const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_ROUNDS = 10

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: [true, 'Email is already in use.'],
            required: [true, 'Email is required.'],
            trim: true,
            lowercase: true,
            match: [EMAIL_REGEX, 'Please use a valid email address.']
        },

        name: {
            type: String,
            required: [true, 'Name is required.']
        },

        password: {
            type: String,
            required: [true, 'Password is required.'],
            minlength: [8, 'The password must be at least 8 characters long.']

        },
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.password
                delete ret.__v
                delete ret
            }
        }
    }
);

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, SALT_ROUNDS)
            .then(hash => {
                this.password = hash;
                next();
            })
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function(passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User