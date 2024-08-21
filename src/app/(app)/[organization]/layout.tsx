import { HomeIcon, SquarePenIcon } from 'lucide-react'
import { ChannelsMenuItems } from '~/components/channels/menu-items'
import { Menu, MenuItem } from '~/components/menu'
import { NewTicketModal } from '~/components/new-ticket-dialog'
import OrgLayoutSkeleton from '~/components/organizations/layout-skeleton'
import { OrganizationProviderSSR } from '~/components/organizations/organization-provider-ssr'
import { DesktopSideNav } from '~/components/scaffolding/desktop-sidenav'
import PageContainer from '~/components/scaffolding/page-container'
import { Scaffold } from '~/components/scaffolding/scaffold'
import { OrganizationSwitcher } from '~/components/topnav/org-switcher'
import { Topnav } from '~/components/topnav/organization'
import { SmallIconButton } from '~/components/ui/custom/icon-button'

export default function HomeLayout(props: {
    children: React.ReactNode
    params: { organization: string }
}) {
    return (
        <OrganizationProviderSSR
            orgSlug={props.params.organization}
            fallback={<OrgLayoutSkeleton />}
        >
            <Scaffold
                appbarFit="above-children"
                leftSide={
                    <DesktopSideNav>
                        <div className="flex gap-2 items-center mb-2">
                            <div className="flex-grow">
                                <OrganizationSwitcher />
                            </div>
                            <NewTicketModal>
                                <SmallIconButton
                                    icon={<SquarePenIcon />}
                                    variant="outline"
                                    size="icon"
                                />
                            </NewTicketModal>
                        </div>
                        <Menu>
                            <MenuItem icon={<HomeIcon />}>Home</MenuItem>
                            <ChannelsMenuItems />
                        </Menu>
                    </DesktopSideNav>
                }
                appbar={<Topnav />}
            >
                <PageContainer className="md:border-l border-t md:bg-secondary md:rounded-tl-md md:dark:border-white/25">
                    {props.children}
                </PageContainer>
            </Scaffold>
        </OrganizationProviderSSR>
    )
}
