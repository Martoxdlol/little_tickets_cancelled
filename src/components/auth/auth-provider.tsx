'use client'

import { type Session, type User } from 'lucia'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { createContext, useContext } from 'react'

const authCtx = createContext<
    | {
          session: Session & { user: User }
      }
    | undefined
>(undefined)

export function AuthProvider(props: {
    session: (Session & { user: User }) | null
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const redirectPath = pathname + searchParams.toString()

    if (!props.session) {
        return redirect(
            `/login?redirect_path=${encodeURIComponent(redirectPath)}`,
        )
    }

    if (!props.session.user.onboardingCompleted) {
        return redirect(
            `/onboarding?redirect_path=${encodeURIComponent(redirectPath)}`,
        )
    }

    return (
        <authCtx.Provider value={{ session: props.session }}>
            {props.children}
        </authCtx.Provider>
    )
}

export function useSession() {
    const ctx = useContext(authCtx)

    if (!ctx) {
        throw new Error('useSession must be used within AuthProvider')
    }

    return ctx.session
}
