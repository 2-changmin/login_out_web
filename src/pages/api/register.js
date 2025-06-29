import { db } from '../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: '입력 누락' });

  const [exists] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (exists.length > 0) return res.status(409).json({ message: '이미 존재하는 아이디' });

  const hashed = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);

  res.status(201).json({ message: '회원가입 성공' });
}
