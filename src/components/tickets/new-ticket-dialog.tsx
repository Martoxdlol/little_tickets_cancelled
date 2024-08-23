'use client'

import dynamic from 'next/dynamic'
import { useString } from '~/i18n/react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'

const LazyEditor = dynamic(async () => (await import('../editor')).Editor, {
    ssr: false,
})

export function NewTicketModal(props: { children: React.ReactNode }) {
    const newTicketString = useString('newTicket')

    return (
        <Dialog>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className="flex w-full max-w-[650px] flex-col gap-2 p-4">
                <DialogHeader className="hidden">
                    <DialogTitle>{newTicketString}</DialogTitle>
                    <DialogDescription>{newTicketString}</DialogDescription>
                </DialogHeader>
                <input className="bg-transparent p-0 text-lg outline-0" />
                <LazyEditor />
            </DialogContent>
        </Dialog>
    )
}
