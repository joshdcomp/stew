import { handlers } from '@/auth.config'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

const { GET:_GET, POST:_POST } = handlers

export const GET = async (req:NextRequest) => {
    console.log('GET', {req})
    return await _GET(req)
}

export const POST = async (req:NextRequest) => {
    console.log('POST', {req})
    return await _POST(req)
}