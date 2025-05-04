// This file generates a single instance of the database to be used throughout the application.
// This is required as I have separated the functions into different files for better organization and readability.
import Database from "./index.js";

const db = new Database();

export default db;