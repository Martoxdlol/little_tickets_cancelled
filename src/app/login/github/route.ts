import { generateState } from 'arctic'
import { cookies } from 'next/headers'

import { github } from '~/server/auth'

export async function GET(request: Request): Promise<Response> {
    const state = generateState()
    const url = await github.createAuthorizationURL(state)

    cookies().set('github_oauth_state', state, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: 'lax',
    })

    const redirectPath = new URL(request.url).searchParams.get('redirect_path')
    if (redirectPath) {
        cookies().set('redirect_path', '/', {
            path: redirectPath,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 60 * 10,
            sameSite: 'lax',
        })
    }

    return Response.redirect(url)
}
