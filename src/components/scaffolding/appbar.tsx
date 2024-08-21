export default function Appbar(props: { children: React.ReactNode }) {
    return (
        <nav className="flex h-[46px] w-full items-center gap-2 px-2">
            {props.children}
        </nav>
    )
}
