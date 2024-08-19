export default function Appbar(props: { children: React.ReactNode }) {
    return <nav className='h-[60px] w-full border-b'>{props.children}</nav>
}
