import { ReactNode } from 'react'
import { AuthProviderSSR } from '~/components/auth/auth-provider-ssr'
import { SessionLangProvider } from '~/i18n/lang-provider'
import { AppStringsProvider } from '~/i18n/react'

export default function Layout(props: { children: ReactNode }) {
    return (
        <AuthProviderSSR>
            <SessionLangProvider>
                <AppStringsProvider>{props.children}</AppStringsProvider>
            </SessionLangProvider>
        </AuthProviderSSR>
    )
}
