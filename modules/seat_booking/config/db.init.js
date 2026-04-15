import pg from "pg";

const initDB = async () => {
  const { pool } = await import("../../../index.mjs");
  const conn = await pool.connect();
  await conn.query("BEGIN");
  await conn.query(`CREATE TABLE IF NOT EXISTS seats (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        isbooked INT DEFAULT 0
    )`);
  const { rows } = await conn.query(`SELECT COUNT(*) FROM seats`);
  if (parseInt(rows[0].count) > 0) {
    console.log("isbooked already initialized");
    await conn.query("COMMIT");
    conn.release();
    return;
  }
  await conn.query(`INSERT INTO seats (isbooked)
    SELECT 0 FROM generate_series(1, 20);`);
  await conn.query("COMMIT");
  conn.release();
};

export default initDB;
