import BookRepository from "../src/infrastructure/repositories/bookRepository.js";
import * as BookModel from "../src/data/bookModel.js";

jest.mock("../src/data/bookModel.js");

describe("BookRepository", () => {
  let db;
  let bookRepository;

  beforeEach(() => {
    db = { execute: jest.fn() };
    bookRepository = new BookRepository(db);
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("harus mengembalikan semua buku", async () => {
      const mockBooks = [{ id: 1, title: "Book A", author: "Author A", year: "2020" }];
      BookModel.getAllBooks.mockResolvedValue(mockBooks);

      const result = await bookRepository.findAll();

      expect(BookModel.getAllBooks).toHaveBeenCalledWith(db);
      expect(result).toEqual(mockBooks);
    });
  });

  describe("findById", () => {
    it("harus mengembalikan buku berdasarkan ID", async () => {
      const book = { id: 1, title: "Book A", author: "Author A", year: "2020" };
      BookModel.getBookById.mockResolvedValue(book);

      const result = await bookRepository.findById(1);

      expect(BookModel.getBookById).toHaveBeenCalledWith(db, 1);
      expect(result).toEqual(book);
    });
  });

  describe("create", () => {
    it("harus membuat buku baru", async () => {
      const data = { title: "Book A", author: "Author A", year: "2020" };
      const createdBook = { id: 1, ...data };
      BookModel.createBook.mockResolvedValue(createdBook);

      const result = await bookRepository.create(data);

      expect(BookModel.createBook).toHaveBeenCalledWith(db, data);
      expect(result).toEqual(createdBook);
    });
  });

  describe("update", () => {
    it("harus mengupdate buku", async () => {
      const data = { title: "Book A Updated", author: "Author A", year: "2021" };
      BookModel.updateBookById.mockResolvedValue();

      await bookRepository.update(1, data);

      expect(BookModel.updateBookById).toHaveBeenCalledWith(db, 1, data);
    });
  });

  describe("remove", () => {
    it("harus menghapus buku", async () => {
      BookModel.deleteBookById.mockResolvedValue();

      await bookRepository.remove(1);

      expect(BookModel.deleteBookById).toHaveBeenCalledWith(db, 1);
    });
  });
});