'use client'

import Link from 'next/link'
import Center from '~/components/scaffolding/center'
import { Section } from '~/components/scaffolding/section'
import { Title } from '~/components/ui/custom/title'
import { api } from '~/trpc/react'

export default function OrgHomePageContent(props: { organization: string }) {
    const [channels] = api.channels.list.useSuspenseQuery({
        organizationSlug: props.organization,
    })

    return (
        <>
            {channels.map((channel) => (
                <Section key={channel.id}>
                    <Link
                        href={`/${props.organization}/${channel.slug}`}
                        className="block hover:underline"
                    >
                        <Title>{channel.name}</Title>
                    </Link>
                    <div className="relative h-24 rounded-md border border-dashed border-black/25 dark:border-white/25">
                        <Center className="text-xs opacity-secondary">
                            No tickets
                        </Center>
                    </div>
                </Section>
            ))}
        </>
    )
}
