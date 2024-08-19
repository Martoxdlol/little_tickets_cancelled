import { GitHub, Google } from 'arctic'
import { Lucia, TimeSpan } from 'lucia'
import { env } from '~/env'

import { db } from '../db'
import { LuciaAuthAdapter } from './adapter'

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
    locale: string
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
