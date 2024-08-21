'use client'

import { CircleDashedIcon, CircleDotDashedIcon, PlusIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useString } from '~/i18n/react'
import { type RouterOutputs } from '~/trpc/react'
import { MenuItem, MenuItemSkeleton, MenuSectionTitle } from '../menu'
import { useOrganization } from '../organizations/organization-provider'
import { NewModalDialog } from './new-channel-modal'

export function ChannelsMenuSection(props: {
    channels: RouterOutputs['channels']['list']
}) {
    const org = useOrganization()
    const title = useString('channels')

    const path = usePathname()

    const [, channelSlug] = path.split('/').filter(Boolean)

    return (
        <>
            <MenuSectionTitle>{title}</MenuSectionTitle>
            {props.channels?.map((item) => (
                <MenuItem
                    key={item.id}
                    href={`/${org.slug}/${item.slug}`}
                    icon={
                        channelSlug === item.slug ? (
                            <CircleDotDashedIcon />
                        ) : (
                            <CircleDashedIcon />
                        )
                    }
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

    return (
        <NewModalDialog>
            <MenuItem icon={<PlusIcon />}>{title}</MenuItem>
        </NewModalDialog>
    )
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
