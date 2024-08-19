export default function Appbar(props: { children: React.ReactNode }) {
    return (
        <nav className="flex h-[60px] w-full items-center gap-2 border-b px-2">
            {props.children}
        </nav>
    )
}
