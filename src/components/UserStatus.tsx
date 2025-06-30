'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: number
  username: string
}

export default function UserStatus() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout')
    alert('로그아웃 완료!')
    router.push('/')
  }

  if (!user) {
    // 로그인 안 된 상태
    return (
      <div>
        <button onClick={() => router.push('/')}>로그인</button>
        <button onClick={() => router.push('/register')}>회원가입</button>
      </div>
    )
  }

  // 로그인된 상태
  return (
    <div>
      <span>👋 {user.username}님</span>&nbsp;
      <button onClick={() => router.push('/mypage')}>마이페이지</button>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}
