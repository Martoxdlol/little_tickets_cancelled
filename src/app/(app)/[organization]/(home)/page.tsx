import PageLayout from '~/components/scaffolding/page-layout'
import { api, HydrateClient } from '~/trpc/server'
import OrgHomePageContent from './page-content'

export default async function Page(props: {
    params: { organization: string }
}) {
    void api.channels.list.prefetch({
        organizationSlug: props.params.organization,
    })

    return (
        <HydrateClient>
            <PageLayout>
                <OrgHomePageContent organization={props.params.organization} />
            </PageLayout>
        </HydrateClient>
    )
}
