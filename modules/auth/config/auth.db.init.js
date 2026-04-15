import pg from "pg";

const initAuthDB = async () => {
  const { pool } = await import("../../../index.mjs");
  const conn = await pool.connect();
  await conn.query("BEGIN");
  await conn.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(322) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        verification_token TEXT,
        refresh_token TEXT,
        reset_password_token TEXT,
        reset_password_token_expires TIMESTAMP,
        created_at TIMESTAMP DEFAULT now()
    )`);
  await conn.query("COMMIT");
  conn.release();
};

export default initAuthDB;
