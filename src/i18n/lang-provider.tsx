'use client'

import { createContext, ReactNode, useContext } from 'react'
import { useSession } from '~/components/auth/auth-provider'
import { type LangKey, langs } from './lib'

const langCtx = createContext<{ lang: LangKey }>({ lang: 'en' })

export function SessionLangProvider(props: { children: ReactNode }) {
    const session = useSession()

    return (
        <LangProvider lang={session.user.locale}>{props.children}</LangProvider>
    )
}

export function LangProvider({
    lang,
    children,
}: {
    lang: string
    children: ReactNode
}) {
    if (langs.includes(lang as LangKey)) {
        return (
            <langCtx.Provider value={{ lang: lang as LangKey }}>
                {children}
            </langCtx.Provider>
        )
    }

    return (
        <langCtx.Provider value={{ lang: 'en' }}>{children}</langCtx.Provider>
    )
}

export function useLang() {
    return useContext(langCtx).lang
}
