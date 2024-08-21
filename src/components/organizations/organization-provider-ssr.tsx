import { Suspense } from 'react'
import { api } from '~/trpc/server'
import { OrganizationProvider } from './organization-provider'

export function OrganizationProviderSSR(props: {
    children: React.ReactNode
    orgSlug: string
    fallback?: React.ReactNode
    notFoundFallback?: React.ReactNode
}) {
    return (
        <Suspense fallback={props.fallback}>
            <OrganizationProviderInner orgSlug={props.orgSlug}>
                {props.children}
            </OrganizationProviderInner>
        </Suspense>
    )
}

async function OrganizationProviderInner(props: {
    children: React.ReactNode
    orgSlug: string
    notFoundFallback?: React.ReactNode
}) {
    const org = await api.organizations.getBySlug({ slug: props.orgSlug })

    if (!org) {
        return <>{props.notFoundFallback}</>
    }

    return (
        <OrganizationProvider organization={org}>
            <title>{org.name}</title>
            {props.children}
        </OrganizationProvider>
    )
}
