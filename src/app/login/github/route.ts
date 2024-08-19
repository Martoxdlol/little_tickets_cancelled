import { generateState } from 'arctic'
import { cookies } from 'next/headers'
import {
    github,
    setAuthLocaleCookie,
    setRedirectPathCookie,
} from '~/server/auth'

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
    setRedirectPathCookie(redirectPath)
    setAuthLocaleCookie()

    return Response.redirect(url)
}
