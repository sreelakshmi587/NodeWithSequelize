const db  = require("../models");

const Book = db.Book;

const findBookByTitle = async (title) => {
    try {
        const book = await Book.findOne({
            where: { title: title }});
        return book;
    } catch (error) {
        throw error;
    }
};
const findBookById = async (id) => {
    try {
        const book = await Book.findOne({
            where: { id: id }});
        return book;
    } catch (error) {
        throw error;
    }
}; 

const createBookIfNotExists = async (req, book) => {
    try {
        const { title, description } = book;
        const existingBook = await Book.findOne({
            where: { title: title }});
        
        if (!existingBook) {
            const createdBook = await Book.create(book);

            return createdBook;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

const getBooks  =  ()=>{
    try {
        const books= Book.findAll();
        return books;
    } catch (error) {
        throw error;
    }
};

const updateBook = async (id, book) => {
    try {
        const { title, description } = book;
        const [rowsUpdated, updatedBooks] = await Book.update(
            { title, description },
            { where: { id: id }, returning: true, plain: true }
        );
        return updatedBooks;

    } catch (error) {
        throw error;
    }
};

const deleteBook = async(id)=>{
    try {
        const deletedBook = await Book.destroy({ where: { id: id } });
        if(deletedBook){
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    findBookById,
    findBookByTitle,
    createBookIfNotExists ,
    getBooks,
    updateBook,
    deleteBook};