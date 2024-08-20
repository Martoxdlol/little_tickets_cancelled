'use client'

import { TextFormField } from '../form-fields/text'
import { Button } from '../ui/button'
import { IconButton } from '../ui/custom/icon-button'
import { useForm } from '@tanstack/react-form'
import { TRPCClientError } from '@trpc/client'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { useString } from '~/i18n/react'
import { nameToSlug, slugSchema } from '~/lib/schemas'

export function NameSlugForm(props: {
    namePlaceholder?: string
    shortSlugSuffix?: string
    onSubmit: (values: {
        name: string
        slug: string
    }) => Promise<string | undefined | void>
    isLoading?: boolean
    defaultName?: string
    defaultSlug?: string
}) {
    const [error, setError] = useState<string | undefined>(undefined)

    const genericErrorString = useString('slugErrorMessage')

    const form = useForm({
        defaultValues: {
            name: props.defaultName ?? '',
            slug: props.defaultSlug ?? '',
        },
        onSubmit: async ({ value }) => {
            try {
                let slug = value.slug
                if (!slug) {
                    slug = nameToSlug(value.name)
                }

                if (slug.length < 4) {
                    slug += props.shortSlugSuffix ?? ''
                }

                const error = await props.onSubmit({
                    name: value.name,
                    slug,
                })

                if (error) {
                    setError(error)
                } else {
                    setError(undefined)
                }
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    setError(error.message)
                } else {
                    setError(genericErrorString)
                }
            }
        },
    })

    const slugField = form.useField({ name: 'name' })
    let defaultSlug =
        nameToSlug(slugField.state.value) ||
        nameToSlug(props.namePlaceholder ?? '')
    if (defaultSlug.length < 4) {
        defaultSlug += props.shortSlugSuffix ?? ''
    }

    const slugErrorString = useString('slugErrorMessage')
    const nameErrorString = useString('nameErrorMessage')

    return (
        <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            {error && <p className="text-red-500">{error}</p>}
            <TextFormField
                form={form}
                validator={z.string().min(1).max(56)}
                placeholder={props.namePlaceholder}
                name="name"
                label="Name"
                errorMessage={nameErrorString}
            />
            <TextFormField
                form={form}
                name="slug"
                label="Identifier"
                validator={slugSchema.or(z.literal(''))}
                placeholder={defaultSlug}
                transform={(v) => nameToSlug(v)}
                errorMessage={slugErrorString}
                validateOnChange
            />
            {!props.isLoading && <Button type="submit">Continue</Button>}
            {props.isLoading && (
                <IconButton
                    icon={<Loader2Icon className="animate-spin" />}
                    disabled
                >
                    Continue
                </IconButton>
            )}
        </form>
    )
}
