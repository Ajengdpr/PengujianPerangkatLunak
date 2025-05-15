class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async listBooks() {
    return await this.bookRepository.findAll();
  }

  async getBook(id) {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new Error("Buku tidak ditemukan");
    }
    return book;
  }

  async addBook(data) {
    const { title, author, year } = data;
    if (!title || !author || !year) {
      throw new Error("Data tidak lengkap");
    }
    return await this.bookRepository.create({ title, author, year });
  }

  async editBook(id, data) {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new Error("Buku tidak ditemukan");
    }

    const { title, author, year } = data;
    if (!title || !author || !year) {
      throw new Error("Data tidak lengkap");
    }

    await this.bookRepository.update(id, { title, author, year });
  }

  async deleteBook(id) {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new Error("Buku tidak ditemukan");
    }
    await this.bookRepository.remove(id);
  }
}

export default BookService;