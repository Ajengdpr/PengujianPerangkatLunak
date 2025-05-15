# UTS - Pengujian Perangkat Lunak - CLI BREAD App

Aplikasi CLI sederhana menggunakan Node.js dan MySQL (XAMPP) dengan entitas `Book`, menerapkan Clean Architecture dan Unit Test 90%+.

## Cara Menjalankan
1. Install dependency:
   ```
   npm install
   ```

2. Buat database dan tabel:
   ```
   CREATE DATABASE uts_bread;
   USE uts_bread;
   CREATE TABLE books (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(100),
     author VARCHAR(100),
     year INT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

3. Jalankan aplikasi:
   ```
   node cli.js
   ```

4. Jalankan tes:
   ```
   npm test
   ```

## Struktur Folder
- models/
- repositories/
- services/
- usecases/
- test/

Seluruh fitur BREAD ditangani per layer, sesuai clean architecture.
