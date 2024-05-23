import pg from "pg"; // Import the entire module
import config from "../config/config.js";
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const database = new Pool({
  connectionString: connectionString,
});

const db = await database.connect();
export default db;
