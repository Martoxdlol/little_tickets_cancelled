import Link from 'next/link'
import { ComponentProps } from 'react'
import { Scaffold } from '~/components/scaffolding/scaffold'
import { cn } from '~/lib/utils'

export default function Page(props: {
    searchParams: { redirect_path?: string }
}) {
    return (
        <Scaffold>
            <AuthLink
                provider="google"
                redirectPath={props.searchParams.redirect_path}
            >
                Continue with Google
            </AuthLink>
            <AuthLink
                provider="github"
                redirectPath={props.searchParams.redirect_path}
            >
                Continue with GitHub
            </AuthLink>
        </Scaffold>
    )
}

function AuthLink({
    redirectPath,
    ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & {
    provider: string
    redirectPath?: string | null
}) {
    return (
        <Link
            {...props}
            href={{
                pathname: '/login/github',
                query: {
                    redirectPath,
                },
            }}
            className={cn('block', props.className)}
        >
            {props.children}
        </Link>
    )
}
