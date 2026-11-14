'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) router.push('/admin')
    }
    checkUser()
  }, [supabase, router])

  return (
    <div className="max-w-md mx-auto mt-24 px-6">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        redirectTo="/admin"
      />
    </div>
  )
}
