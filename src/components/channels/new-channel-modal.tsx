'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { smallSlugSchema } from '~/lib/schemas'
import { api } from '~/trpc/react'
import { NameSlugForm } from '../forms/name-slug-form'
import { useOrganization } from '../organizations/organization-provider'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'

export function NewModalDialog(props: { children: React.ReactNode }) {
    const { mutateAsync: createChannel } = api.channels.create.useMutation()
    const org = useOrganization()

    const router = useRouter()

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New channel</DialogTitle>
                </DialogHeader>
                <div>
                    <NameSlugForm
                        slugSchema={smallSlugSchema}
                        namePlaceholder="Orders & Invoices"
                        onSubmit={async (values) => {
                            await createChannel({
                                name: values.name,
                                slug: values.slug,
                                organizationSlug: org.slug,
                            })

                            router.push(`/${org.slug}/${values.slug}`)
                            router.refresh()
                            setOpen(false)
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
