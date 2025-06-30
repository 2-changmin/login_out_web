import cookie from 'cookie'

export default function handler(req, res) {
  // ✅ 쿠키 초기화: token 쿠키를 삭제
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0) // 과거 시간으로 설정해서 삭제
  }))

  res.status(200).json({ message: '로그아웃 성공' })
}
