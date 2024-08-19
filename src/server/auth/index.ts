import { db } from '../db'
import { LuciaAuthAdapter } from './adapter'
import { GitHub, Google } from 'arctic'
import { Lucia, TimeSpan } from 'lucia'
import { cookies, headers } from 'next/headers'
import { env } from '~/env'
import { LangKey } from '~/i18n/lib'

const adapter = new LuciaAuthAdapter(db)

export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(12, 'm'),
    sessionCookie: {
        // this sets cookies with super long expiration
        // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
        expires: false,
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === 'production',
        },
    },
    getUserAttributes: (attributes) => {
        return {
            githubId: attributes.githubId,
            name: attributes.name,
            locale: attributes.locale,
            onboardingCompleted: attributes.onboardingCompleted,
        }
    },
})

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes {
    githubId: number | null
    name: string
    locale: LangKey
    onboardingCompleted: boolean
}

export const github = new GitHub(
    env.GITHUB_CLIENT_ID,
    env.GITHUB_CLIENT_SECRET,
    {
        redirectURI: new URL('/login/github/callback', env.BASE_URL).href,
    },
)

export const google = new Google(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    new URL('/login/google/callback', env.BASE_URL).href,
)

export function resetRedirectPathCookie() {
    cookies().set('redirect_path', '/', {
        maxAge: 0,
    })
}

export function setRedirectPathCookie(path?: string | null) {
    if (!path) {
        return resetRedirectPathCookie()
    }

    cookies().set('redirect_path', path, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: 'lax',
    })
}

export function consumeRedirectPathCookie() {
    const redirectPath = cookies().get('redirect_path')
    resetRedirectPathCookie()
    return redirectPath?.value ?? '/'
}

export function getLocaleFromHeader() {
    return (
        /([a-z]){2}/.exec(headers().get('accept-language') ?? '')?.[0] ?? 'en'
    )
}

export function setAuthLocaleCookie(locale?: string) {
    cookies().set('login_locale', locale || getLocaleFromHeader(), {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: 'lax',
    })
}

export function consumeAuthLocaleCookie() {
    const locale = cookies().get('login_locale')
    cookies().set('login_locale', '', {
        maxAge: 0,
    })
    return locale?.value ?? 'en'
}
