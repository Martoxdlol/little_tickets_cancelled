'use client'

import { MenuItem, MenuItemSkeleton, MenuSectionTitle } from '../menu'
import { useOrganization } from '../organizations/organization-provider'
import { CircleDashedIcon, PlusIcon } from 'lucide-react'
import { useString } from '~/i18n/react'
import { api } from '~/trpc/react'

export function ChannelsMenuItems() {
    const org = useOrganization()
    const title = useString('channels')

    const { data: channels, isPending } = api.channels.list.useQuery(
        {
            organizationId: org.id,
        },
        {
            retry: Infinity,
            retryDelay: 5000,
        },
    )

    return (
        <>
            <MenuSectionTitle>{title}</MenuSectionTitle>
            {channels?.map((item) => (
                <MenuItem
                    key={item.id}
                    href={`/${org.slug}/${item.slug}`}
                    icon={<CircleDashedIcon />}
                >
                    {item.name}
                </MenuItem>
            ))}
            {isPending && (
                <>
                    <MenuItemSkeleton />
                    <MenuItemSkeleton />
                    <MenuItemSkeleton />
                </>
            )}
            <AutoAddChannelMenuItem />
        </>
    )
}

export function AutoAddChannelMenuItem() {
    const title = useString('createChannel')
    const org = useOrganization()

    if (org.role === 'member') {
        return null
    }

    return <MenuItem icon={<PlusIcon />}>{title}</MenuItem>
}
