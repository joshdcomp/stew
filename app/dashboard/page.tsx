import { auth, signOut } from '@/auth.config'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AuthenticatedPage from '../ui/AuthenticatedPage';

export default async function Home() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }
  const userInfo = JSON.stringify(session || {}, null, 2)

  return (
    <AuthenticatedPage>
      <h1 className='text-primary'>dashboard</h1>
      <pre className="text-primary max-w-md overflow-scroll"><code>{userInfo}</code></pre>
      <Link href="/chore-wars">Chore wars</Link>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Switch user</button>
      </form>
    </AuthenticatedPage>
  );
}
