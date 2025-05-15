# UTS - Pengujian Perangkat Lunak - BREAD Unit Test 2

Aplikasi CLI sederhana menggunakan Node.js dan MySQL (XAMPP) dengan entitas `Book'.

## Cara Menjalankan
1. Install dependency:
   ```
   npm install
   ```

2. Buat database dan tabel:
   ```
   CREATE DATABASE uts_ppkpl;
   USE uts_ppkpl;
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
./src/application
./src/data
./src/infrastructure
./src/infrastructure/repositories
./src/interface
./test
