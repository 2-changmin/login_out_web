'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MyPage() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // 로그인된 사용자 정보 가져오기
    const fetchUser = async () => {
      const res = await fetch('/api/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        alert('로그인이 필요합니다.')
        router.push('/') // 로그인 페이지로 이동
      }
    }

    fetchUser()
  }, [])

  if (!user) return <p>로딩 중...</p>

  return (
    <div>
      <h1>마이페이지</h1>
      <p>안녕하세요, <strong>{user.username}</strong>님!</p>
      <p>회원번호(ID): {user.id}</p>
    </div>
  )
}
