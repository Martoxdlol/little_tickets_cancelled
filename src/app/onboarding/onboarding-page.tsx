'use client'

import { OnboardingFrom } from './onboarding-form'
import { type Session, type User } from 'lucia'
import Appbar from '~/components/scaffolding/appbar'
import PageContainer from '~/components/scaffolding/page-container'
import { Scaffold } from '~/components/scaffolding/scaffold'
import { Screen } from '~/components/scaffolding/screen'
import { useString } from '~/i18n/react'

export default function OnboardingPage(props: {
    session: Session & { user: User }
    redirectPath: string
}) {
    const welcomeString = useString('welcome')
    const titleString = useString('onboardingTitle')
    const session = props.session

    return (
        <Screen>
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
                        redirectPath={props.redirectPath}
                    />
                </PageContainer>
            </Scaffold>
        </Screen>
    )
}
