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
            <PageContainer className="md:bg-content border-t md:rounded-tl-md md:border-l"></PageContainer>
        </Scaffold>
    )
}
