import type { ComponentProps } from 'react'
import { cn } from '~/lib/utils'

export default function PageContainer(props: ComponentProps<'div'>) {
    return (
        <div
            {...props}
            className={cn(
                'flex h-full flex-col gap-4 overflow-y-auto p-4 sm:p-6',
                props.className,
            )}
        />
    )
}
