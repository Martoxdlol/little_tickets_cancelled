'use client'
import { useSession } from '~/components/auth/auth-provider'

export default function Page() {
    const session = useSession()

    return (
        <div>
            <h1>{session.user.name}</h1>
        </div>
    )
}
