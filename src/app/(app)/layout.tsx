import { ReactNode } from 'react'
import { AuthProviderSSR } from '~/components/auth/auth-provider-ssr'
import { SessionLangProvider } from '~/i18n/lang-provider'

export default function Layout(props: { children: ReactNode }) {
    return (
        <AuthProviderSSR>
            <SessionLangProvider>{props.children}</SessionLangProvider>
        </AuthProviderSSR>
    )
}
