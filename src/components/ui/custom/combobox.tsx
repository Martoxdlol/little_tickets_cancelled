'use client'

import { Check, ChevronsUpDown, XIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '~/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '~/components/ui/popover'
import { useLang } from '~/i18n/lang-provider'
import { cn } from '~/lib/utils'

export type ComboboxOption<T> = {
    label: string
    value: T
}

export function Combobox<T extends { toString(): string }>(props: {
    options?: ComboboxOption<T>[]
    value: T | undefined
    onValueChange: (value: T | undefined) => void
    allowEmpty?: boolean
    isLoading?: boolean
    isErrored?: boolean
    errorText?: string
    defaultText?: string
    emptyText?: string
}) {
    const [open, setOpen] = useState(false)
    const value = props.value

    const options = props.options || []

    const currentOption = options.find((option) => option.value === value)

    const lang = useLang()

    let displayText = 'Select option'

    if (lang === 'es') {
        displayText = 'Seleccionar'
    }

    if (props.defaultText) {
        displayText = props.defaultText
    }

    if (props.value !== null && props.value !== undefined) {
        displayText = 'unknown'

        if (lang === 'es') {
            displayText = 'desconocido'
        }
    }

    if (currentOption) {
        displayText = currentOption.label
    }

    let emptyLabel = 'No options'

    if (lang === 'es') {
        emptyLabel = 'No hay opciones'
    }

    if (props.emptyText) {
        emptyLabel = props.emptyText
    }

    let searchLabel = 'Search'

    if (lang === 'es') {
        searchLabel = 'Buscar'
    }

    let clearLabel = 'None'
    if (lang === 'es') {
        clearLabel = 'Ninguno'
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {displayText}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput placeholder={searchLabel} />
                    <CommandList>
                        <CommandEmpty>{emptyLabel}</CommandEmpty>
                        <CommandGroup>
                            {props.allowEmpty !== false && (
                                <CommandItem
                                    value="_empty_clear"
                                    onSelect={() => {
                                        props.onValueChange(undefined)
                                    }}
                                >
                                    <XIcon className="mr-2 h-4 w-4 opacity-50" />
                                    {clearLabel}
                                </CommandItem>
                            )}
                            {options.map((option, i) => (
                                <CommandItem
                                    key={option.value.toString()}
                                    value={`${i}_${option.value.toString()}_${option.label}`}
                                    onSelect={() => {
                                        props.onValueChange(option.value)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === option.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
