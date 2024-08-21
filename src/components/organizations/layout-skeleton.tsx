import { DesktopSideNav } from '~/components/scaffolding/desktop-sidenav'
import PageContainer from '~/components/scaffolding/page-container'
import { Scaffold } from '~/components/scaffolding/scaffold'
import { Topnav } from '~/components/topnav/organization'

export default function OrgLayoutSkeleton() {
    return (
        <Scaffold
            appbarFit="above-children"
            leftSide={<DesktopSideNav />}
            appbar={<Topnav />}
        >
            <PageContainer className="md:border-l border-t md:bg-secondary md:rounded-tl-md md:dark:border-white/25"></PageContainer>
        </Scaffold>
    )
}
