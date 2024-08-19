'use client'

import PageContainer from '~/components/scaffolding/page-container'
import { Scaffold } from '~/components/scaffolding/scaffold'
import { Section } from '~/components/scaffolding/section'
import { Topnav } from '~/components/topnav/home'
import { Title } from '~/components/ui/custom/title'
import { useString } from '~/i18n/react'

export default function Home() {
    const createOrganizationString = useString('createOrganization')
    const joinOrganizationString = useString('joinExistingOrganization')

    return (
        <Scaffold appbar={<Topnav />}>
            <PageContainer>
                <Section>
                    <Title>{createOrganizationString}</Title>
                </Section>
                <Section>
                    <Title>{joinOrganizationString}</Title>
                </Section>
            </PageContainer>
        </Scaffold>
    )
}
