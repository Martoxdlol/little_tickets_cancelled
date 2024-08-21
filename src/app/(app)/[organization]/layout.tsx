import { HomeIcon, SquarePenIcon } from 'lucide-react'
import { type ReactNode, Suspense } from 'react'
import { ChannelsMenuItems } from '~/components/channels/channels-menu-items'
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
    children: ReactNode
    menu: ReactNode
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
                        <div className="sticky top-0 z-10 mb-2 flex items-center gap-2 bg-background">
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
                            <MenuItem
                                icon={<HomeIcon />}
                                href={`/${props.params.organization}`}
                            >
                                Home
                            </MenuItem>
                            {props.menu}
                            <ChannelsMenuItems
                                orgSlug={props.params.organization}
                            />
                        </Menu>
                    </DesktopSideNav>
                }
                appbar={<Topnav />}
            >
                <PageContainer className="border-t bg-content md:rounded-tl-md md:border-l">
                    <Suspense fallback="loading...">{props.children}</Suspense>
                </PageContainer>
            </Scaffold>
        </OrganizationProviderSSR>
    )
}
