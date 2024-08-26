'use client'

import { useString } from '~/i18n/react'
import { Editor } from '../editor'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'

export function NewTicketModal(props: { children: React.ReactNode }) {
    const newTicketString = useString('newTicket')

    return (
        <Dialog>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className="flex h-full w-full max-w-[650px] flex-col gap-2 border-0 p-4 sm:h-auto sm:border">
                <DialogHeader className="hidden">
                    <DialogTitle>{newTicketString}</DialogTitle>
                    <DialogDescription>{newTicketString}</DialogDescription>
                </DialogHeader>
                <input
                    className="bg-transparent p-0 text-lg outline-0"
                    placeholder="Title here..."
                />
                <Editor />
            </DialogContent>
        </Dialog>
    )
}
