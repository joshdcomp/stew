import Link from "next/link"
import { getUser } from "@/app/lib/actions"

export default async function Home() {
  const session = await getUser()
  const userInfo = JSON.stringify(session || {}, null, 2)

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {userInfo
        ? (<pre className="text-primary max-w-md overflow-scroll"><code>{userInfo}</code></pre>)
        : null
      }

      <Link href='/login'>Login page</Link>
      <Link href='/dashboard'>Dashboard page</Link>
    </main>

  );
}
