import ChoreWarsContent from './content'
import { ChoreProvider } from './chore-context'
import AuthenticatedPage from '../ui/AuthenticatedPage'

export const revalidate = 0
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function ChoreWars() {

    return (
        <AuthenticatedPage>
            <ChoreProvider>
                <ChoreWarsContent />
            </ChoreProvider>
        </AuthenticatedPage>
    )
}
