import type { ComponentProps } from 'react'
import { cn } from '~/lib/utils'

export default function PageContainer({
    twoColumn = false,
    centered = false,
    ...props
}: ComponentProps<'div'> & { twoColumn?: boolean; centered?: boolean }) {
    return (
        <div
            {...props}
            className={cn(
                'h-full overflow-y-auto p-4 sm:p-6 gap-4',
                {
                    'flex flex-col': !twoColumn,
                    'grid grid-cols-1 md:grid-cols-2': twoColumn,
                    'sm:w-full sm:mx-auto sm:max-w-[90%] lg:max-w-[80%] xl:max-w-[75%]':
                        centered,
                },
                props.className,
            )}
        />
    )
}
