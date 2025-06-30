import { db } from '../../lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body

  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username])
  const user = rows[0]
  if (!user) return res.status(401).json({ message: '존재하지 않는 아이디' })

  const isMatch = await bcrypt.compare(password, user.password)  // ✅ 해시 비교
  if (!isMatch) return res.status(401).json({ message: '비밀번호 불일치' })

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24,
  }))

  res.status(200).json({ message: '로그인 성공' })
}
