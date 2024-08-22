'use client'

import { useString } from '~/i18n/react'
import Editor from '../editor'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

export function NewTicketModal(props: { children: React.ReactNode }) {
    const newTicketString = useString('newTicket')

    return (
        <Dialog>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className="flex w-full max-w-[650px] flex-col gap-2 overflow-hidden p-4">
                <input className="bg-transparent p-0 text-lg outline-0" />
                <Editor />
            </DialogContent>
        </Dialog>
    )
}
