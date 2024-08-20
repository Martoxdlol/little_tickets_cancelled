export function DesktopSideNav(props: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-64 h-full bg-background min-h-0 overflow-y-auto dark:border-r shadow-md dark:shadow-none">
            {props.children}
        </div>
    )
}
