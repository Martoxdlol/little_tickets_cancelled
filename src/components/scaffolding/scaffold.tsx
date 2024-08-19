import {} from '~/components/ui/sheet'

export function Scaffold(props: {
    children: React.ReactNode
    appbar?: React.ReactNode
    bottomNav?: React.ReactNode
    floatingActionButton?: React.ReactNode
    leftSide?: React.ReactNode
    rightSide?: React.ReactNode
}) {
    return (
        <div className='flex h-full w-full flex-col'>
            {props.appbar && <header className='w-full shrink-0'>{props.appbar}</header>}
            <div className='relative flex h-full min-h-0 w-full shrink'>
                {props.leftSide && <aside className='relative z-10 shrink-0'>{props.leftSide}</aside>}
                <main className='relative h-full min-h-0 w-full shrink'>{props.children}</main>
                {props.floatingActionButton && <aside className='absolute right-4 bottom-4 z-10'>{props.floatingActionButton}</aside>}
            </div>
            {props.bottomNav && <footer className='w-full shrink-0'>{props.bottomNav}</footer>}
        </div>
    )
}
