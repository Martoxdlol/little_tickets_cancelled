'use client'

import Link from 'next/link'
import { forwardRef, type MouseEventHandler, type ReactElement } from 'react'
import { cn } from '~/lib/utils'
import { Skeleton } from '../ui/skeleton'

export function Menu(props: { children: React.ReactNode; className?: string }) {
    return (
        <ul className={cn('flex w-full flex-col gap-0.5 p-1', props.className)}>
            {props.children}
        </ul>
    )
}

export const MenuItem = forwardRef<
    HTMLLIElement,
    {
        children: React.ReactNode
        icon?: ReactElement
        href?: string
        onClick?:
            | MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
            | undefined
    }
>((props, ref) => {
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
            onClick={props.onClick}
            className={buttonClassName}
        >
            {children}
        </Link>
    ) : (
        <button className={buttonClassName} onClick={props.onClick}>
            {children}
        </button>
    )

    return (
        <li ref={ref} className="relative h-8">
            {content}
        </li>
    )
})

MenuItem.displayName = 'MenuItem'

export function MenuSectionTitle(props: { children: React.ReactNode }) {
    return (
        <p className="px-[9px] pb-0.5 pt-2 text-xs opacity-secondary">
            {props.children}
        </p>
    )
}

export function MenuItemSkeleton() {
    return (
        <MenuItem>
            <Skeleton className="-ml-6 h-4 w-full" />
        </MenuItem>
    )
}
