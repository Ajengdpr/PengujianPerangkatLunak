import inquirer from "inquirer";
import { createConnection } from "../infrastructure/db.js";
import BookRepository from "../infrastructure/repositories/bookRepository.js";
import BookService from "../application/bookService.js";

async function main() {
  const db = await createConnection();
  const bookRepository = new BookRepository(db);
  const bookService = new BookService(bookRepository);

  let exit = false;
  while (!exit) {
    const { menu } = await inquirer.prompt([
      {
        type: "list",
        name: "menu",
        message: "=== Aplikasi Buku ===",
        choices: [
          "1. Tampilkan semua buku",
          "2. Tambah buku",
          "3. Ubah buku",
          "4. Hapus buku",
          "5. Cari buku berdasarkan ID",
          "6. Keluar",
        ],
      },
    ]);

    switch (menu[0]) {
      case "1":
        {
          const books = await bookService.listBooks();
          console.table(books);
        }
        break;
      case "2":
        {
          const newBookData = await inquirer.prompt([
            { type: "input", name: "title", message: "Judul buku:" },
            { type: "input", name: "author", message: "Penulis buku:" },
            { type: "input", name: "year", message: "Tahun terbit:" },
          ]);
          await bookService.addBook(newBookData);
          console.log("Buku berhasil ditambahkan.");
        }
        break;
      case "3":
        {
          const { id: updateId } = await inquirer.prompt([
            { type: "input", name: "id", message: "Masukkan ID buku yang akan diubah:" },
          ]);
          const updateData = await inquirer.prompt([
            { type: "input", name: "title", message: "Judul baru:" },
            { type: "input", name: "author", message: "Penulis baru:" },
            { type: "input", name: "year", message: "Tahun terbit baru:" },
          ]);
          await bookService.editBook(updateId, updateData);
          console.log("Buku berhasil diperbarui.");
        }
        break;
      case "4":
        {
          const { id: deleteId } = await inquirer.prompt([
            { type: "input", name: "id", message: "Masukkan ID buku yang akan dihapus:" },
          ]);
          await bookService.deleteBook(deleteId);
          console.log("Buku berhasil dihapus.");
        }
        break;
      case "5":
        {
          const { id: searchId } = await inquirer.prompt([
            { type: "input", name: "id", message: "Masukkan ID buku:" },
          ]);
          try {
            const book = await bookService.getBook(searchId);
            console.table([book]);
          } catch (error) {
            console.log(error.message);
          }
        }
        break;
      case "6":
        exit = true;
        console.log("Keluar dari program...");
        break;
      default:
        console.log("Pilihan tidak valid.");
        break;
    }
  }
}

main();