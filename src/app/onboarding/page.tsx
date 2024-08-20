import OnboardingPage from './onboarding-page'
import { redirect } from 'next/navigation'
import { getServerAuthSession } from '~/server/auth/react'

export default async function Page(props: {
    searchParams: { redirect_path?: string }
}) {
    const session = await getServerAuthSession()

    if (!session) {
        return redirect(
            '/login?redirect_path=' +
                encodeURIComponent(props.searchParams.redirect_path || ''),
        )
    }

    if (session.user.onboardingCompleted) {
        return redirect(props.searchParams.redirect_path || '/')
    }

    return (
        <OnboardingPage
            session={session}
            redirectPath={props.searchParams.redirect_path || '/'}
        />
    )
}
