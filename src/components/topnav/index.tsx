'use client'
import { SquarePenIcon } from 'lucide-react'
import { useString } from '~/i18n/react'
import { NewTicketModal } from '../new-ticket-dialog'
import Appbar from '../scaffolding/appbar'
import { IconButton } from '../ui/custom/icon-button'

export function Topnav() {
    const newTicketString = useString('newTicket')

    return (
        <Appbar>
            <NewTicketModal>
                <IconButton icon={<SquarePenIcon />} variant="outline">
                    {newTicketString}
                </IconButton>
            </NewTicketModal>
        </Appbar>
    )
}
