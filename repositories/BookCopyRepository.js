const BookCopy = require('../database/models/BookCopyModel');

const { AVAILABLE_STATUS } = require('../Constants/bookStatus');

//Retrieve all book copies in the system
const getBookCopies = async () => {
  try {
    const bookCopies = await BookCopy.find({});
    return bookCopies;
  } catch (error) {
    console.log(
      '🚀 ~ file: BookCopyRepository.js ~ line 9 ~ getBookCopies ~ error',
      JSON.stringify(error)
    );
  }
};

//Find a book copy by Id
const getBookCopyById = async (id) => {
  try {
    const bookCopy = await BookCopy.findById(id);
    return bookCopy;
  } catch (error) {
    console.log(
      '🚀 ~ file: BookCopyRepository.js ~ line 9 ~ getBookCopyById ~ error',
      JSON.stringify(error)
    );
  }
};

//Find by option
const findBookCopy = async (option) => {
  try {
    const bookCopy = await BookCopy.find({ option });
    return bookCopy;
  } catch (error) {
    console.log(
      '🚀 ~ file: BookCopyRepository.js ~ line 22 ~ findBookCopy ~ error',
      JSON.stringify(error)
    );
  }
};
//Create a new book copy
const addNewBookCopy = async (data) => {
  try {
    const newBookCopy = await BookCopy.create(data);
    return newBookCopy;
  } catch (error) {
    console.log(
      '🚀 ~ file: BookCopyRepository.js ~ line 9 ~ addNewBookCopy ~ error',
      JSON.stringify(error)
    );
  }
};

//Update a book copy
const updateBookCopy = async (id, data) => {
  try {
    const updatedBookCopy = await BookCopy.findByIdAndUpdate(id, data);
    return updatedBookCopy;
  } catch (error) {
    console.log(
      '🚀 ~ file: BookCopyRepository.js ~ line 47 ~ updateBookCopy ~ error',
      JSON.stringify(error)
    );
  }
};

//Find available book copies
const findAvailableItem = async (id) => {
  try {
    const items = await BookCopy.find({ bookId: id });
    const count = 0;
    for (const i = 0; i < items.length; i++) {
      if (items[i].data.status == AVAILABLE_STATUS) {
        count++;
      }
    }
    return count;
  } catch (error) {
    console.log(
      '🚀 ~ file: BookCopyRepository.js ~ line 81 ~ findAvailableItem ~ error',
      error
    );
  }
};

//Delete a book copy

const deleteBookCopy = async (id) => {
  try {
    const deletedBookCopy = await BookCopy.findByIdAndRemove(id);
    return deletedBookCopy;
  } catch (error) {
    console.log(
      '🚀 ~ file: BookCopyRepository.js ~ line 95 ~ deleteBookCopy ~ error',
      error
    );
  }
};
module.exports = {
  getBookCopies,
  getBookCopyById,
  addNewBookCopy,
  findBookCopy,
  updateBookCopy,
  findAvailableItem,
  deleteBookCopy,
};
