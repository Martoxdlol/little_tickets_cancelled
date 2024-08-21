'use client'

import { NewOrgForm } from '~/components/forms/new-org-form'
import PageContainer from '~/components/scaffolding/page-container'
import PageLayout from '~/components/scaffolding/page-layout'
import { Scaffold } from '~/components/scaffolding/scaffold'
import { Section } from '~/components/scaffolding/section'
import { Topnav } from '~/components/topnav/home'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Title } from '~/components/ui/custom/title'
import { useString } from '~/i18n/react'

export default function Home() {
    const createOrganizationString = useString('createOrganization')
    const joinOrganizationString = useString('joinExistingOrganization')
    const noPendingInvitationsString = useString('noPendingInvitations')

    return (
        <Scaffold appbar={<Topnav />}>
            <PageContainer>
                <PageLayout twoColumn centered>
                    <Section>
                        <Card className="overflow-hidden shadow-none">
                            <CardHeader className="mb-4 border-b bg-secondary">
                                <CardTitle>
                                    {createOrganizationString}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="">
                                <NewOrgForm />
                            </CardContent>
                        </Card>
                    </Section>
                    <Section>
                        <Title>{joinOrganizationString}</Title>
                        <p className="text-sm opacity-secondary">
                            {noPendingInvitationsString}
                        </p>
                    </Section>
                </PageLayout>
            </PageContainer>
        </Scaffold>
    )
}
