import { redirect } from 'next/navigation'
import { getServerAuthSession } from '~/server/auth/react'

export default async function Welcome() {
    const session = await getServerAuthSession()

    if (session) {
        return redirect('/home')
    }

    return (
        <>
            <header>Little Tickets</header>
            <main>
                <h1>Landing page</h1>
            </main>
        </>
    )
}
