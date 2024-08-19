import { OnboardingFrom } from './onboarding-form'
import { redirect } from 'next/navigation'
import Appbar from '~/components/scaffolding/appbar'
import PageContainer from '~/components/scaffolding/page-container'
import { Scaffold } from '~/components/scaffolding/scaffold'
import { useString } from '~/i18n/react'
import { getServerAuthSession } from '~/server/auth/react'

export default async function OnboardingPage(props: {
    searchParams: { redirect_path?: string }
}) {
    const session = await getServerAuthSession()
    const welcomeString = useString('welcome')
    const titleString = useString('onboardingTitle')

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
        <Scaffold
            appbar={
                <Appbar>
                    {welcomeString} {session.user.name}!
                </Appbar>
            }
        >
            <PageContainer>
                <p>{titleString}</p>
                <OnboardingFrom
                    user={session.user}
                    redirectPath={props.searchParams.redirect_path || '/'}
                />
            </PageContainer>
        </Scaffold>
    )
}
