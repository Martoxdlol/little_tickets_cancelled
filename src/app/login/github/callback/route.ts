import { OAuth2RequestError } from 'arctic'
import { cookies } from 'next/headers'
import { github, lucia } from '~/server/auth'
import { db, schema } from '~/server/db'

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = cookies().get('github_oauth_state')?.value ?? null
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400,
        })
    }

    try {
        const tokens = await github.validateAuthorizationCode(code)
        const githubUserResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        })
        const githubUser: GitHubUser = await githubUserResponse.json()
        console.log(githubUser)
        const [user] = await db
            .insert(schema.users)
            .values({
                username: githubUser.login,
                name: githubUser.login,
                email: githubUser.email,
                picture: githubUser.avatar_url,
                githubId: githubUser.id,
            })
            .onConflictDoUpdate({
                target: [schema.users.githubId],
                set: {
                    username: githubUser.login,
                    email: githubUser.email,
                    picture: githubUser.avatar_url,
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

        const redirectPath = cookies().get('redirect_path')?.value ?? '/'
        cookies().set('redirect_path', '', {
            expires: new Date(0),
        })

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

interface GitHubUser {
    id: number
    login: string
    avatar_url: string
    email: string | null
}
