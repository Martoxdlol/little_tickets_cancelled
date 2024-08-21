'use client'

import { type LangKey, validateLocale } from './lib'
import { createContext, type ReactNode, useContext } from 'react'
import { useSession } from '~/components/auth/auth-provider'

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
    return (
        <langCtx.Provider value={{ lang: validateLocale(lang) }}>
            {children}
        </langCtx.Provider>
    )
}

export function useLang() {
    return useContext(langCtx).lang
}
