'use client'

import { NewTicketModal } from '../new-ticket-dialog'
import Appbar from '../scaffolding/appbar'
import { SmallIconButton } from '../ui/custom/icon-button'
import { UserAvatar } from './user-dropdown'
import { SquarePenIcon } from 'lucide-react'
import { useString } from '~/i18n/react'

export function Topnav() {
    const newTicketString = useString('newTicket')

    return (
        <Appbar>
            <NewTicketModal>
                <SmallIconButton icon={<SquarePenIcon />} variant="outline">
                    {newTicketString}
                </SmallIconButton>
            </NewTicketModal>
            <div className="flex-grow" />
            <UserAvatar />
        </Appbar>
    )
}
