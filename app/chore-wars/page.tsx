import ChoreWarsContent from './content'
import { ChoreProvider } from './chore-context'
import AuthenticatedPage from '../ui/AuthenticatedPage'
import ChoreSubNav from './chore-subnav'

export const revalidate = 0
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function ChoreWars() {

    return (
        <AuthenticatedPage>
            <ChoreProvider>
                <div className="w-full lg:flex lg:gap-x-16 lg:px-8">
                    <h1 className="sr-only">Page title, change me</h1>

                    <aside className="flex overflow-x-auto border-b border-gray-900/5 py-2 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-5">
                        <ChoreSubNav />
                    </aside>

                    <main className="px-4 py-8 sm:px-6 lg:flex-auto lg:px-0 lg:py-5">
                        <div className="space-y-5 sm:space-y-10 lg:mx-0 lg:max-w-none">
                            <ChoreWarsContent />
                        </div>
                    </main>
                </div>
            </ChoreProvider>
        </AuthenticatedPage>
    )
}
