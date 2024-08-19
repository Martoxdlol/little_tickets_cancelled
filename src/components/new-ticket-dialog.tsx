'use client'

import { useString } from '~/i18n/react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'

export function NewTicketModal(props: { children: React.ReactNode }) {
    const newTicketString = useString('newTicket')

    return (
        <Dialog>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{newTicketString}</DialogTitle>
                </DialogHeader>
                <div></div>
            </DialogContent>
        </Dialog>
    )
}
