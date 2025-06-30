'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// ✅ user의 타입 명시
type User = {
  id: number
  username: string
}

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null) // ✅ 타입 명확히 지정
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        alert('로그인이 필요합니다.')
        router.push('/')
      }
    }

    fetchUser()
  }, [])

  if (!user) return <p>로딩 중...</p> // ✅ 여기서 null 검사함

  return (
    <div>
      <h1>마이페이지</h1>
      <p>안녕하세요, <strong>{user.username}</strong>님!</p>
      <p>회원번호(ID): {user.id}</p>
    </div>
  )
}
