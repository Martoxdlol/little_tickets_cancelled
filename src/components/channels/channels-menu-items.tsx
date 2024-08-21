import { Suspense } from 'react'
import { api } from '~/trpc/server'
import {
    ChannelMenuItemSkeleton,
    ChannelsMenuSection,
} from './channels-menu-section'

export function ChannelsMenuItems(props: { orgSlug: string }) {
    return (
        <Suspense fallback={<ChannelMenuItemSkeleton />}>
            <ChannelsMenuItemsInner orgSlug={props.orgSlug} />
        </Suspense>
    )
}

async function ChannelsMenuItemsInner(props: { orgSlug: string }) {
    const channels = await api.channels.list({
        organizationSlug: props.orgSlug,
    })

    return <ChannelsMenuSection channels={channels} />
}
