import { OrganizationProvider } from './organization-provider'
import { Suspense } from 'react'
import { api } from '~/trpc/server'

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
            {props.children}
        </OrganizationProvider>
    )
}
