import mysql from "mysql2/promise";

export async function createConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "uts_ppkpl",
    port: 3306,
  });
  console.log("📦 Database connected");
  return connection;
}