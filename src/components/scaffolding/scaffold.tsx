export function Scaffold(props: {
    children: React.ReactNode
    appbar?: React.ReactNode
    bottomNav?: React.ReactNode
    floatingActionButton?: React.ReactNode
    leftSide?: React.ReactNode
    rightSide?: React.ReactNode
    appbarFit?: 'above-all' | 'above-children'
}) {
    const appbarFit = props.appbarFit || 'above-all'

    return (
        <div className="flex h-full w-full flex-col">
            {props.appbar && appbarFit === 'above-all' && (
                <header className="w-full shrink-0">{props.appbar}</header>
            )}
            <div className="relative flex h-full min-h-0 w-full shrink">
                {props.leftSide && (
                    <aside className="relative z-10 shrink-0">
                        {props.leftSide}
                    </aside>
                )}
                <div className="relative flex-grow min-h-0 shrink">
                    {props.appbar && appbarFit === 'above-children' && (
                        <header className="w-full shrink-0 z-10">
                            {props.appbar}
                        </header>
                    )}
                    {props.children}
                </div>
                {props.floatingActionButton && (
                    <aside className="absolute bottom-4 right-4 z-10">
                        {props.floatingActionButton}
                    </aside>
                )}
            </div>
            {props.bottomNav && (
                <footer className="w-full shrink-0">{props.bottomNav}</footer>
            )}
        </div>
    )
}
