import { AuthProvider } from './auth-provider'
import { ReactNode } from 'react'
import { getServerAuthSession } from '~/server/auth/react'

export async function AuthProviderSSR(props: { children: ReactNode }) {
    const session = await getServerAuthSession()

    return <AuthProvider session={session}>{props.children}</AuthProvider>
}
