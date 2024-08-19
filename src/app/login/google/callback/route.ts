import { OAuth2RequestError } from 'arctic'
import { cookies } from 'next/headers'
import {
    consumeAuthLocaleCookie,
    consumeRedirectPathCookie,
    google,
    lucia,
} from '~/server/auth'
import { db, schema } from '~/server/db'

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = cookies().get('google_oauth_state')?.value ?? null
    const storedCodeVerifier = cookies().get('code_verifier')?.value ?? null

    if (
        !code ||
        !state ||
        !storedState ||
        !storedCodeVerifier ||
        state !== storedState
    ) {
        return new Response(null, {
            status: 400,
        })
    }

    try {
        const tokens = await google.validateAuthorizationCode(
            code,
            storedCodeVerifier,
        )

        const googleUserResponse = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            },
        )
        const googleUser: GoogleUser = await googleUserResponse.json()

        if (googleUser.email_verified === false) {
            return new Response(null, {
                status: 400,
            })
        }

        const [user] = await db
            .insert(schema.users)
            .values({
                locale: consumeAuthLocaleCookie(),
                name: googleUser.name,
                googleId: googleUser.sub,
                picture: googleUser.picture,
                email: googleUser.email,
            })
            .onConflictDoUpdate({
                target: [schema.users.googleId],
                set: {
                    picture: googleUser.picture,
                },
            })
            .returning()

        if (!user) {
            throw new Error('Failed to create/update obtain user')
        }

        const session = await lucia.createSession(user.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        )

        const redirectPath = consumeRedirectPathCookie()

        return new Response(null, {
            status: 302,
            headers: {
                Location: redirectPath,
            },
        })
    } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400,
            })
        }

        console.error(e)

        return new Response(null, {
            status: 500,
        })
    }
}

interface GoogleUser {
    sub: string
    name: string
    given_name: string
    family_name: string
    picture: string
    email: string
    email_verified: boolean
}
