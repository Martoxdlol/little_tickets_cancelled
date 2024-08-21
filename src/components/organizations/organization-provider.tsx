'use client'

import { createContext, useContext } from 'react'

export type OrganizationContext = {
    id: string
    slug: string
    name: string
    role: 'owner' | 'admin' | 'member'
}

const ctx = createContext<OrganizationContext | null>(null)

export function OrganizationProvider(props: {
    organization: OrganizationContext
    children: React.ReactNode
}) {
    return (
        <ctx.Provider value={props.organization}>{props.children}</ctx.Provider>
    )
}

export function useOrganization() {
    const organization = useContext(ctx)

    if (!organization) {
        throw new Error('OrganizationProvider not found')
    }

    return organization
}
