export const getAllBooks = async (db) => {
  const [rows] = await db.execute("SELECT * FROM books");
  return rows;
};

export const getBookById = async (db, id) => {
  const [rows] = await db.execute("SELECT * FROM books WHERE id = ?", [id]);
  return rows[0];
};

export const createBook = async (db, data) => {
  const { title, author, year } = data;
  const [result] = await db.execute(
    "INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
    [title, author, year]
  );
  return { id: result.insertId, title, author, year };
};

export const updateBookById = async (db, id, data) => {
  const { title, author, year } = data;
  await db.execute(
    "UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?",
    [title, author, year, id]
  );
};

export const deleteBookById = async (db, id) => {
  await db.execute("DELETE FROM books WHERE id = ?", [id]);
};