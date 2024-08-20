'use client'

import Link from 'next/link'
import { ReactElement } from 'react'
import { cn } from '~/lib/utils'

export function Menu(props: { children: React.ReactNode; className?: string }) {
    return (
        <ul className={cn('flex flex-col p-1 w-full', props.className)}>
            {props.children}
        </ul>
    )
}

export function MenuItem(props: {
    children: React.ReactNode
    icon?: ReactElement
    href?: string
    onClick?: () => void
}) {
    const buttonClassName =
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent focus:bg-accent focus:text-accent-foreground pl-8 w-full'

    const children = (
        <>
            {props.icon && (
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {props.icon}
                </span>
            )}
            {props.children}
        </>
    )

    const content = props.href ? (
        <Link
            href={props.href}
            onClick={() => props.onClick?.()}
            className={buttonClassName}
        >
            <a className={buttonClassName}>{children}</a>
        </Link>
    ) : (
        <button className={buttonClassName} onClick={() => props.onClick?.()}>
            {children}
        </button>
    )

    return <li className="relative h-8">{content}</li>
}

export function MenuSectionTitle(props: { children: React.ReactNode }) {
    return (
        <p className="text-xs opacity-secondary pt-2 pb-0.5 px-[9px]">
            {props.children}
        </p>
    )
}
