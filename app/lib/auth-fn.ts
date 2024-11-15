'use server';

import { auth } from '@/auth.config'
import { redirect } from 'next/navigation';


async function authCheck(redirectIfUnauthed:boolean=false) {
    const session = await auth()
    
    if (!session && redirectIfUnauthed) {
        redirect('/login')
    }
    return session
}

export default authCheck