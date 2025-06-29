// src/lib/db.js
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysqlehdgns0911&',
  database: 'next_auth_db',
});
