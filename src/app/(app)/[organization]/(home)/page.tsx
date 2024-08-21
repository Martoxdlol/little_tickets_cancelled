import OrgHomePageContent from './page-content'
import { api, HydrateClient } from '~/trpc/server'

export default async function Page(props: {
    params: { organization: string }
}) {
    void api.channels.list.prefetch({
        organizationSlug: props.params.organization,
    })

    return (
        <HydrateClient>
            <OrgHomePageContent organization={props.params.organization} />
        </HydrateClient>
    )
}
