import Header from "@/app/ui/header"
import { UserProvider } from "@/app/ui/user-context"
import { auth } from "@/auth.config"
import { redirect } from "next/navigation"

export default async function AuthenticatedPage({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session?.user) {
        redirect('/login')
    }

    return (
        <UserProvider user={session?.user}>
            <Header />
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    {children}
                </main>
            </div>
        </UserProvider>
    )
}