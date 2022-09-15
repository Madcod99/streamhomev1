const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: [true, 'a login must be provided'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'a password is required'],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
    },

);


const User = mongoose.model('User', userSchema);

module.exports = User;