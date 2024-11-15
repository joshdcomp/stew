import Link from "next/link"
import authCheck from "@/app/lib/auth-fn"

export default async function Home() {
  const session = await authCheck()
  const userInfo = JSON.stringify(session || {}, null, 2)
  console.log('home', {session})
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {userInfo
          ? (<pre><code>{userInfo}</code></pre>)
          : null
        }

        <Link href='/login'>Login page</Link>
        <Link href='/dashboard'>Dashboard page</Link>
      </main>
    </div>
  );
}
