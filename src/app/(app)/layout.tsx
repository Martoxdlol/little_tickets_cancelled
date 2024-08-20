import { ReactNode } from 'react'
import { AuthProviderSSR } from '~/components/auth/auth-provider-ssr'
import { Screen } from '~/components/scaffolding/screen'
import { ThemeProvider } from '~/components/theme/theme-provider'
import { SessionLangProvider } from '~/i18n/lang-provider'
import { AppStringsProvider } from '~/i18n/react'

export default function Layout(props: { children: ReactNode }) {
    return (
        <AuthProviderSSR>
            <SessionLangProvider>
                <AppStringsProvider>
                    <ThemeProvider
                        disableTransitionOnChange={true}
                        attribute="class"
                        defaultTheme="system"
                        enableSystem={true}
                    >
                        <Screen>{props.children}</Screen>
                    </ThemeProvider>
                </AppStringsProvider>
            </SessionLangProvider>
        </AuthProviderSSR>
    )
}
