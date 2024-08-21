'use client'

import { useSession } from '../auth/auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useString } from '~/i18n/react'

export function UserAvatar() {
    const session = useSession()

    return (
        <UserDropDown>
            <Avatar className="size-7">
                {session.user.picture && (
                    <AvatarImage
                        src={session.user.picture}
                        alt={session.user.name}
                    />
                )}
                <AvatarFallback>
                    {getNameTwoInitialsSafe(session.user.name)}
                </AvatarFallback>
            </Avatar>
        </UserDropDown>
    )
}

export function UserDropDown(props: { children: React.ReactNode }) {
    const myAccountString = useString('myAccount')
    const logoutString = useString('logout')
    const { setTheme, theme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{props.children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{myAccountString}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>More...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>New Team</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <Cloud className="mr-2 h-4 w-4" />
                    <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <MoonIcon className="dark:block hidden mr-2 h-4 w-4" />
                        <SunIcon className="dark:hidden mr-2 h-4 w-4" />
                        <span>Theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup
                                value={theme}
                                onValueChange={setTheme}
                            >
                                <DropdownMenuRadioItem
                                    value="light"
                                    className="flex items-center gap-2"
                                >
                                    Light
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value="dark"
                                    className="flex items-center gap-2"
                                >
                                    Dark
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value="system"
                                    className="flex items-center gap-2"
                                >
                                    System
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => (window.location.href = '/logout')}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{logoutString}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function getNameTwoInitialsSafe(name: string) {
    const parts = name.split(' ')
    if (parts.length === 1) {
        return parts[0]!.slice(0, 2).toUpperCase()
    }

    return parts
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
}
