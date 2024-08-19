'use client'

import { useLang } from './lang-provider'
import { type AppStrings, createAppStrings } from './strings'
import { createContext, useContext, useMemo } from 'react'

const appStringsCtx = createContext<AppStrings>(createAppStrings('en'))

export function AppStringsProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const lang = useLang()

    const strings = useMemo(() => createAppStrings(lang), [lang])

    return (
        <appStringsCtx.Provider value={strings}>
            {children}
        </appStringsCtx.Provider>
    )
}

export function useAppStrings() {
    return useContext(appStringsCtx)
}

export function useString(key: Parameters<AppStrings['get']>[0]) {
    const strings = useContext(appStringsCtx)

    return strings.get(key)
}
