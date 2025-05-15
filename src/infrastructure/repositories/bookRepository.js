import * as BookModel from "../../data/bookModel.js";

class BookRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    return await BookModel.getAllBooks(this.db);
  }

  async findById(id) {
    return await BookModel.getBookById(this.db, id);
  }

  async create(data) {
    return await BookModel.createBook(this.db, data);
  }

  async update(id, data) {
    await BookModel.updateBookById(this.db, id, data);
  }

  async remove(id) {
    await BookModel.deleteBookById(this.db, id);
  }
}

export default BookRepository;