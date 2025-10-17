'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLogin } from '@/components/AdminAuth'

const AUTH_KEY = 'tribu_admin_auth'

export default function AdminPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY)
    if (auth === 'true') {
      router.push('/admin/dashboard')
    } else {
      setChecking(false)
    }
  }, [router])

  const handleSuccess = () => {
    router.push('/admin/dashboard')
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Caricamento...</p>
      </div>
    )
  }

  return <AdminLogin onSuccess={handleSuccess} />
}