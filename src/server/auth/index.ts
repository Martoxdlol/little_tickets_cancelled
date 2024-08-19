import { GitHub } from 'arctic'
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
    githubId: string | null
    name: string
}

export const github = new GitHub(
    env.GITHUB_CLIENT_ID,
    env.GITHUB_CLIENT_SECRET,
    {
        redirectURI: env.GITHUB_REDIRECT_URI,
    },
)
