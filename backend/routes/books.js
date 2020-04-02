const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get(async (req, res) => {
    try{
        const books = await Book.find();
        res.json(books);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/add').post(async (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const newBook = new Book({title, author, genre});
    try {
        await newBook.save()
        res.json('Book added!');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book);
    } catch(err) {
        res.status(400).json(`Error: + ${err}`);
    }
});

router.route('/:id').delete(async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json('Book Deleted.');
    } catch(err) {
        res.status(400).json(`Error: + ${err}`);
    }
});

router.route('/update/:id').post(async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;

        await book.save();
        res.json('Book Updated!');
    }catch(err){
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;