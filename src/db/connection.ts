import { config } from "dotenv";
config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: process.env.DB_NAME,
  port: 5432,
});

const dbConnect = async () => {
  try {
      await pool.connect();
      console.log("Connected to the database successfully.");
  } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
  }
};

export { pool, dbConnect };