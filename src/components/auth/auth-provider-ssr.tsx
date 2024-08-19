import { ReactNode } from 'react'
import { getServerAuthSession } from '~/server/auth/react'
import { AuthProvider } from './auth-provider'

export async function AuthProviderSSR(props: { children: ReactNode }) {
    const session = await getServerAuthSession()
    console.log(session)
    return <AuthProvider session={session}>{props.children}</AuthProvider>
}
