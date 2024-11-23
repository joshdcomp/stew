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
            <div className="items-center justify-items-center min-h-screen p-4 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
                <div className="flex flex-col gap-8 w-full row-start-2 items-center sm:items-start">
                    {children}
                </div>
            </div>
        </UserProvider>
    )
}