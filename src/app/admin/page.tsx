'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLogin, useAdminAuth } from '@/components/AdminAuth'

export default function AdminPage() {
  const router = useRouter()
  const { isAuthenticated } = useAdminAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, router])

  const handleSuccess = () => {
    router.push('/admin/dashboard')
  }

  if (isAuthenticated) {
    return null
  }

  return <AdminLogin onSuccess={handleSuccess} />
}