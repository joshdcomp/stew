import Image from "next/image"
import { auth, signOut } from '@/auth.config'
import { userInfo } from "os"

export default async function Home() {
  const session = await auth()
  const userInfo = JSON.stringify(session || {}, null, 2)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>dashboard</h1>
        <pre><code>{userInfo}</code></pre>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button type="submit">Sign out with Google</button>
        </form>
      </main>
    </div>
  );
}
