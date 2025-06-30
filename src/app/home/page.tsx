// src/app/home/page.tsx
'use client'

import Header from '@/components/Header'  // ✅ 새로 만든 공통 헤더 컴포넌트 import

export default function HomePage() {
  return (
    <div>
      <Header />  {/* ✅ 상단에 공통 헤더 삽입 */}

      <h1>홈페이지입니다</h1>
    </div>
  )
}
