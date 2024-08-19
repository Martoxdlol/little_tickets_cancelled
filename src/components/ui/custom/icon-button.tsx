import { type ComponentProps, forwardRef } from 'react'
import { cn } from '~/lib/utils'
import { Button } from '../button'

export const IconButton = forwardRef<
    HTMLButtonElement,
    ComponentProps<typeof Button> & { icon: JSX.Element }
>((props, ref) => {
    return (
        <Button
            {...props}
            className={cn('gap-2 [&>svg]:size-4', props.className)}
            ref={ref}
        >
            {props.icon}
            {props.children}
        </Button>
    )
})
