'use client'

import { NewTicketModal } from '../new-ticket-dialog'
import Appbar from '../scaffolding/appbar'
import { IconButton } from '../ui/custom/icon-button'
import { UserAvatar } from './user-dropdown'
import { SquarePenIcon } from 'lucide-react'
import { useString } from '~/i18n/react'

export function Topnav() {
    const newTicketString = useString('newTicket')

    return (
        <Appbar>
            <NewTicketModal>
                <IconButton icon={<SquarePenIcon />} variant="outline">
                    {newTicketString}
                </IconButton>
            </NewTicketModal>
            <div className="flex-grow" />
            <UserAvatar />
        </Appbar>
    )
}
