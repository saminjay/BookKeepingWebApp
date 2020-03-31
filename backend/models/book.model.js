const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type:String, required: true, trim: true},
    author: { type:String, required: true, trim: true},
    genre: { type:String, required:true, trim:true},
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;