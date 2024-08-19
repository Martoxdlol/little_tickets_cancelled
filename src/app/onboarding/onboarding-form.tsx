'use client'

import { User } from 'lucia'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Combobox } from '~/components/ui/custom/combobox'
import { IconButton } from '~/components/ui/custom/icon-button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { LangKey } from '~/i18n/lib'
import { api } from '~/trpc/react'

export function OnboardingFrom(props: { redirectPath: string; user: User }) {
    const [name, setName] = useState('')
    const [lang, setLang] = useState<LangKey>(props.user.locale)

    const router = useRouter()

    const { mutateAsync: completeOnboarding, isPending } =
        api.auth.completeOnboarding.useMutation({
            onSuccess() {
                router.push(props.redirectPath)
            },
        })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        void completeOnboarding({
            locale: lang,
            name,
        })
    }

    return (
        <form
            className="flex flex-col gap-2 [&>div]:flex [&>div]:flex-col [&>div]:gap-0.5"
            onSubmit={handleSubmit}
        >
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    min={1}
                    max={255}
                />
            </div>
            <div>
                <Label>Language</Label>
                <Combobox
                    options={[
                        { label: 'English', value: 'en' },
                        { label: 'Español', value: 'es' },
                    ]}
                    value={lang}
                    onValueChange={(value) => setLang(value as LangKey)}
                />
            </div>
            {!isPending && <Button type="submit">Continue</Button>}
            {isPending && (
                <IconButton
                    disabled
                    icon={<Loader2Icon className="animate-spin" />}
                >
                    Continue
                </IconButton>
            )}
        </form>
    )
}
