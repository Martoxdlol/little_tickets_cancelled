import { redirect } from 'next/navigation'
import { type ReactNode } from 'react'
import { api } from '~/trpc/server'

export default async function Layout(props: { children: ReactNode }) {
    const memberships = await api.organizations.listMemberships()

    if (memberships.length > 0) {
        return redirect(`/${memberships[0]!.organization.slug}`)
    }

    return <>{props.children}</>
}
