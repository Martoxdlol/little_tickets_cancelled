import { ReactNode } from 'react'
import { AuthProviderSSR } from '~/components/auth/auth-provider-ssr'

export default function Layout(props: { children: ReactNode }) {
    return <AuthProviderSSR>{props.children}</AuthProviderSSR>
}
