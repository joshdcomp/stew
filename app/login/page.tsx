import LoginForm from '@/app/ui/login-form'
import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await auth()
  if (!!session) {
    redirect('/dashboard')
  }
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative max-w-[800px] mx-auto flex w-full min-h-full flex-1 flex-col justify-center space-y-2.5 p-4 py-12 md:-mt-32 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Your Company"
            src="/service-bell.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <LoginForm />
      </div>
    </main>
  )
}


