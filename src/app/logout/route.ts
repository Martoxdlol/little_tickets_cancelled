import { cookies } from 'next/headers'
import { lucia } from '~/server/auth'

export async function GET(request: Request): Promise<Response> {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

    if (!sessionId) {
        return redirect()
    }

    const result = await lucia.validateSession(sessionId)

    if (!result.session) {
        return redirect()
    }

    await lucia.invalidateSession(result.session.id)

    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    )

    return redirect()
}

function redirect() {
    return new Response(null, {
        status: 302,
        headers: {
            Location: '/',
        },
    })
}
