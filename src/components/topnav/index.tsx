import { SquarePenIcon } from 'lucide-react'
import Appbar from '../scaffolding/appbar'
import { IconButton } from '../ui/custom/icon-button'

export function Topnav() {
    return (
        <Appbar>
            <IconButton icon={<SquarePenIcon />} variant="outline">
                New ticket
            </IconButton>
        </Appbar>
    )
}
