'use client'

import { NameSlugForm } from './name-slug-form'
import { api } from '~/trpc/react'

export function NewOrgForm() {
    const { mutateAsync: createOrg } = api.organizations.create.useMutation()

    return (
        <NameSlugForm
            namePlaceholder="My Company"
            shortSlugSuffix="-org"
            onSubmit={async ({ name, slug }) => {
                await createOrg({ name, slug })
            }}
        />
    )
}
