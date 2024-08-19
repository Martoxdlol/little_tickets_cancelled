import type { ComponentProps } from 'react'
import { cn } from '~/lib/utils'

export function Screen(props: ComponentProps<'div'>) {
    return (
        <div
            {...props}
            className={cn('fixed top-0 right-0 bottom-0 left-0', props.style)}
        >
            {props.children}
        </div>
    )
}
