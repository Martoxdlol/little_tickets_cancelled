import { HomeIcon } from 'lucide-react'
import { Menu, MenuItem, MenuSectionTitle } from '~/components/menu'
import { DesktopSideNav } from '~/components/scaffolding/desktop-sidenav'
import { Scaffold } from '~/components/scaffolding/scaffold'
import { Topnav } from '~/components/topnav/organization'

export default function HomeLayout(props: { children: React.ReactNode }) {
    return (
        <Scaffold
            leftSide={
                <DesktopSideNav>
                    <Menu>
                        <MenuItem icon={<HomeIcon />}>Home</MenuItem>
                        <MenuSectionTitle>General</MenuSectionTitle>
                        <MenuItem>Home</MenuItem>
                        <MenuItem>Home</MenuItem>
                    </Menu>
                </DesktopSideNav>
            }
            appbar={<Topnav />}
        >
            {props.children}
        </Scaffold>
    )
}
