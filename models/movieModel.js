const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validator');

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "champ requis"],
            unique: true,
        },
        description: {
            type: String,
            required:  [true, "champ requis"],
        },
        duree: {
            type: Number,
            required:  [true, "champ requis"],
        },
        year: {
            type: Number,
            required: [true, "champ requis"],
        },
        imagecover: {
            type: String,
            required: [true, "champ requis"],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
    },

);


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;