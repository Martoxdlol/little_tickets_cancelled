'use client'

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
                    <Title>{channel.name}</Title>
                    <div className="relative border border-black/25 dark:border-white/25 rounded-md border-dashed h-24">
                        <Center className="text-xs opacity-secondary">
                            No tickets
                        </Center>
                    </div>
                </Section>
            ))}
        </>
    )
}
