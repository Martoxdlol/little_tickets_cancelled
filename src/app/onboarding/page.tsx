import { OnboardingFrom } from './onboarding-form'
import { redirect } from 'next/navigation'
import Appbar from '~/components/scaffolding/appbar'
import PageContainer from '~/components/scaffolding/page-container'
import { Scaffold } from '~/components/scaffolding/scaffold'
import { getServerAuthSession } from '~/server/auth/react'

export default async function OnboardingPage(props: {
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
        <Scaffold appbar={<Appbar>Welcome {session.user.name}!</Appbar>}>
            <PageContainer>
                <p>Please complete onboarding</p>
                <OnboardingFrom
                    user={session.user}
                    redirectPath={props.searchParams.redirect_path || '/'}
                />
            </PageContainer>
        </Scaffold>
    )
}
