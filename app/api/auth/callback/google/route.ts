import { handlers } from '@/auth.config'

// no edge fn's here, we got databases to call
export const runtime = 'nodejs'

export const { GET, POST } = handlers