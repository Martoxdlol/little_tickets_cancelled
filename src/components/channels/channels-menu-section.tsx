'use client'

import { CircleDashedIcon, PlusIcon } from 'lucide-react'
import { useString } from '~/i18n/react'
import { type RouterOutputs } from '~/trpc/react'
import { MenuItem, MenuItemSkeleton, MenuSectionTitle } from '../menu'
import { useOrganization } from '../organizations/organization-provider'

export function ChannelsMenuSection(props: {
    channels: RouterOutputs['channels']['list']
}) {
    const org = useOrganization()
    const title = useString('channels')

    return (
        <>
            <MenuSectionTitle>{title}</MenuSectionTitle>
            {props.channels?.map((item) => (
                <MenuItem
                    key={item.id}
                    href={`/${org.slug}/${item.slug}`}
                    icon={<CircleDashedIcon />}
                >
                    {item.name}
                </MenuItem>
            ))}
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

export function ChannelMenuItemSkeleton() {
    const title = useString('channels')

    return (
        <>
            <MenuSectionTitle>{title}</MenuSectionTitle>

            <>
                <MenuItemSkeleton />
                <MenuItemSkeleton />
                <MenuItemSkeleton />
            </>

            <AutoAddChannelMenuItem />
        </>
    )
}
