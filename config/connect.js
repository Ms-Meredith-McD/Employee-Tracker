const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection(
  process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
  {
    host: 'localhost',
    user: 'root',
    password: 'aws123',
    database: 'employee_db'
  },
  console.log(`Connected to the books_db database.`)
);

module.exports = db;