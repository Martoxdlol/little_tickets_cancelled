import { Scaffold } from '~/components/scaffolding/scaffold'
import { Topnav } from '~/components/topnav/organization'

export default function HomeLayout(props: { children: React.ReactNode }) {
    return <Scaffold appbar={<Topnav />}>{props.children}</Scaffold>
}
