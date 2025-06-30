import { db } from '../../lib/db'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)  // ✅ 비밀번호 해싱

  await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [
    username,
    hashedPassword
  ])

  res.status(200).json({ message: '회원가입 성공' })
}
