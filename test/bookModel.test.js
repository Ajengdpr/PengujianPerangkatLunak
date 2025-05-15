import * as BookModel from "../src/data/bookModel.js";

describe("BookModel", () => {
  let fakeDb;

  beforeEach(() => {
    fakeDb = {
      execute: jest.fn(),
    };
  });

  describe("getAllBooks", () => {
    it("seharusnya mengembalikan semua baris buku", async () => {
      const expectedRows = [{ id: 1, title: "Book A", author: "Author A", year: "2020" }];
      fakeDb.execute.mockResolvedValue([expectedRows]);

      const rows = await BookModel.getAllBooks(fakeDb);

      expect(fakeDb.execute).toHaveBeenCalledWith("SELECT * FROM books");
      expect(rows).toEqual(expectedRows);
    });
  });

  describe("getBookById", () => {
    it("seharusnya mengembalikan buku berdasarkan ID", async () => {
      const expectedRows = [{ id: 2, title: "Book B", author: "Author B", year: "2021" }];
      fakeDb.execute.mockResolvedValue([expectedRows]);

      const book = await BookModel.getBookById(fakeDb, 2);

      expect(fakeDb.execute).toHaveBeenCalledWith("SELECT * FROM books WHERE id = ?", [2]);
      expect(book).toEqual(expectedRows[0]);
    });
  });

  describe("createBook", () => {
    it("seharusnya memasukkan buku dan mengembalikan buku baru dengan insertId", async () => {
      const data = { title: "New Book", author: "New Author", year: "2022" };
      const fakeResult = { insertId: 10 };
      fakeDb.execute.mockResolvedValue([fakeResult]);

      const newBook = await BookModel.createBook(fakeDb, data);

      expect(fakeDb.execute).toHaveBeenCalledWith(
        "INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
        [data.title, data.author, data.year]
      );
      expect(newBook).toEqual({ id: fakeResult.insertId, ...data });
    });
  });

  describe("updateBookById", () => {
    it("seharusnya mengupdate buku berdasarkan ID", async () => {
      const data = { title: "Updated Book", author: "Updated Author", year: "2023" };
      fakeDb.execute.mockResolvedValue([]);
      
      await BookModel.updateBookById(fakeDb, 5, data);

      expect(fakeDb.execute).toHaveBeenCalledWith(
        "UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?",
        [data.title, data.author, data.year, 5]
      );
    });
  });

  describe("deleteBookById", () => {
    it("seharusnya menghapus buku berdasarkan ID", async () => {
      fakeDb.execute.mockResolvedValue([]);

      await BookModel.deleteBookById(fakeDb, 7);

      expect(fakeDb.execute).toHaveBeenCalledWith("DELETE FROM books WHERE id = ?", [7]);
    });
  });
});