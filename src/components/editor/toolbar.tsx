import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
    BoldIcon,
    CodeIcon,
    CornerDownLeftIcon,
    FileCode2Icon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    ItalicIcon,
    ListIcon,
    ListOrderedIcon,
    ListTodoIcon,
    QuoteIcon,
    Redo2Icon,
    StrikethroughIcon,
    TypeIcon,
    Undo2Icon,
} from 'lucide-react'
import { SmallIconButton } from '../ui/custom/icon-button'
import { useToolbarState } from './toolbar-state'

export function Toolbar() {
    const [editor] = useLexicalComposerContext()

    const focusEditor = () => {
        editor.focus()
    }

    const toolbar = useToolbarState()

    const iconSize = 18

    return (
        <div
            onClick={() => focusEditor()}
            className="absolute bottom-0 left-0 right-0 flex flex-nowrap items-center overflow-x-auto border-t sm:static sm:border-none sm:bg-transparent [&>*]:shrink-0"
        >
            <SmallIconButton
                variant={toolbar.isBold ? 'secondary' : 'ghost'}
                size="icon"
                icon={<BoldIcon size={iconSize} />}
                onClick={() => toolbar.formatBold()}
            />

            <SmallIconButton
                variant={toolbar.isItalic ? 'secondary' : 'ghost'}
                size="icon"
                icon={<ItalicIcon size={iconSize} />}
                onClick={() => toolbar.formatItalic()}
            />

            <SmallIconButton
                variant={toolbar.isStrikethrough ? 'secondary' : 'ghost'}
                size="icon"
                icon={<StrikethroughIcon size={iconSize} />}
                onClick={() => toolbar.formatStrikethrough()}
            />

            <SmallIconButton
                variant={toolbar.isCode ? 'secondary' : 'ghost'}
                size="icon"
                icon={<CodeIcon size={iconSize} />}
                onClick={() => toolbar.formatCode()}
            />

            <SmallIconButton
                variant={toolbar.isCodeBlock ? 'secondary' : 'ghost'}
                size="icon"
                icon={<FileCode2Icon size={iconSize} />}
                onClick={() => toolbar.formatCodeBlock()}
            />

            <SmallIconButton
                variant="ghost"
                size="icon"
                icon={<QuoteIcon size={iconSize} />}
                onClick={() => toolbar.formatQuote()}
            />

            <SmallIconButton
                size="icon"
                variant="ghost"
                icon={<CornerDownLeftIcon size={iconSize} />}
                onClick={() => toolbar.insertLineBreak()}
            />

            <SmallIconButton
                variant={toolbar.isBullet ? 'secondary' : 'ghost'}
                size="icon"
                icon={<ListIcon size={iconSize} />}
                onClick={() => toolbar.formatBulletList()}
            />

            <SmallIconButton
                variant={toolbar.isCheck ? 'secondary' : 'ghost'}
                size="icon"
                icon={<ListTodoIcon size={iconSize} />}
                onClick={() => toolbar.formatCheckList()}
            />

            <SmallIconButton
                variant={toolbar.isNumber ? 'secondary' : 'ghost'}
                size="icon"
                icon={<ListOrderedIcon size={iconSize} />}
                onClick={() => toolbar.formatNumberedList()}
            />

            <SmallIconButton
                size="icon"
                variant={toolbar.isParagraph ? 'secondary' : 'ghost'}
                icon={<TypeIcon size={iconSize} />}
                onClick={() => toolbar.formatParagraph()}
            />

            <SmallIconButton
                size="icon"
                variant={toolbar.isH1 ? 'secondary' : 'ghost'}
                icon={<Heading1Icon size={iconSize} />}
                onClick={() => toolbar.formatH1()}
            />

            <SmallIconButton
                size="icon"
                variant={toolbar.isH2 ? 'secondary' : 'ghost'}
                icon={<Heading2Icon size={iconSize} />}
                onClick={() => toolbar.formatH2()}
            />

            <SmallIconButton
                size="icon"
                variant={toolbar.isH3 ? 'secondary' : 'ghost'}
                icon={<Heading3Icon size={iconSize} />}
                onClick={() => toolbar.formatH3()}
            />

            <SmallIconButton
                size="icon"
                variant="ghost"
                disabled={!toolbar.canUndo}
                icon={<Undo2Icon size={iconSize} />}
                onClick={() => toolbar.undo()}
            />

            <SmallIconButton
                size="icon"
                variant="ghost"
                disabled={!toolbar.canRedo}
                icon={<Redo2Icon size={iconSize} />}
                onClick={() => toolbar.redo()}
            />
        </div>
    )
}
