import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '')
  const token = cookies.token

  if (!token) return res.status(401).json({ message: '로그인 필요' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json({ user: decoded })
  } catch (err) {
    res.status(401).json({ message: '유효하지 않은 토큰' })
  }
}
