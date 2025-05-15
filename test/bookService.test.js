// tests/bookService.test.js
import BookService from "../src/application/bookService.js";

describe("BookService", () => {
  let mockRepository;
  let bookService;

  beforeEach(() => {
    // Buat mock repository dengan fungsi yang akan diinject
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    bookService = new BookService(mockRepository);
    jest.clearAllMocks();
  });

  describe("listBooks", () => {
    it("harus mengembalikan daftar buku dari repository", async () => {
      const books = [{ id: 1, title: "Buku A", author: "Author A", year: "2020" }];
      mockRepository.findAll.mockResolvedValue(books);

      const result = await bookService.listBooks();

      expect(result).toEqual(books);
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("getBook", () => {
    it("harus mengembalikan buku jika ditemukan", async () => {
      const book = { id: 1, title: "Buku A", author: "Author A", year: "2020" };
      mockRepository.findById.mockResolvedValue(book);

      const result = await bookService.getBook(1);

      expect(result).toEqual(book);
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
    });

    it("harus melempar error jika buku tidak ditemukan", async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(bookService.getBook(999)).rejects.toThrow("Buku tidak ditemukan");
      expect(mockRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe("addBook", () => {
    it("harus menambahkan buku baru jika data valid disediakan", async () => {
      const inputData = { title: "Buku A", author: "Author A", year: "2020" };
      const createdBook = { id: 1, ...inputData };
      mockRepository.create.mockResolvedValue(createdBook);

      const result = await bookService.addBook(inputData);

      expect(mockRepository.create).toHaveBeenCalledWith(inputData);
      expect(result).toEqual(createdBook);
    });

    it("harus melempar error jika data tidak lengkap", async () => {
      const incompleteData = { title: "Buku A", author: "Author A" }; // year hilang

      await expect(bookService.addBook(incompleteData)).rejects.toThrow("Data tidak lengkap");
      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("editBook", () => {
    it("harus mengedit buku jika buku ditemukan dan data valid disediakan", async () => {
      const id = 1;
      const existingBook = { id: 1, title: "Buku A", author: "Author A", year: "2020" };
      const newData = { title: "Buku A Updated", author: "Author A", year: "2021" };
      mockRepository.findById.mockResolvedValue(existingBook);
      mockRepository.update.mockResolvedValue();

      await bookService.editBook(id, newData);

      expect(mockRepository.findById).toHaveBeenCalledWith(id);
      expect(mockRepository.update).toHaveBeenCalledWith(id, newData);
    });

    it("harus melempar error jika buku tidak ditemukan", async () => {
      const id = 999;
      const newData = { title: "Buku A Updated", author: "Author A", year: "2021" };
      mockRepository.findById.mockResolvedValue(null);

      await expect(bookService.editBook(id, newData)).rejects.toThrow("Buku tidak ditemukan");
      expect(mockRepository.findById).toHaveBeenCalledWith(id);
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it("harus melempar error jika data tidak lengkap", async () => {
      const id = 1;
      const existingBook = { id: 1, title: "Buku A", author: "Author A", year: "2020" };
      const incompleteData = { title: "Buku A Updated", author: "Author A" }; // year hilang
      mockRepository.findById.mockResolvedValue(existingBook);

      await expect(bookService.editBook(id, incompleteData)).rejects.toThrow("Data tidak lengkap");
      expect(mockRepository.findById).toHaveBeenCalledWith(id);
      expect(mockRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("deleteBook", () => {
    it("harus menghapus buku jika buku ditemukan", async () => {
      const id = 1;
      const existingBook = { id: 1, title: "Buku A", author: "Author A", year: "2020" };
      mockRepository.findById.mockResolvedValue(existingBook);
      mockRepository.remove.mockResolvedValue();

      await bookService.deleteBook(id);

      expect(mockRepository.findById).toHaveBeenCalledWith(id);
      expect(mockRepository.remove).toHaveBeenCalledWith(id);
    });

    it("harus melempar error jika buku tidak ditemukan", async () => {
      const id = 999;
      mockRepository.findById.mockResolvedValue(null);

      await expect(bookService.deleteBook(id)).rejects.toThrow("Buku tidak ditemukan");
      expect(mockRepository.findById).toHaveBeenCalledWith(id);
      expect(mockRepository.remove).not.toHaveBeenCalled();
    });
  });
});