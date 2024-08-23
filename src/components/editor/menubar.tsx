import { useCurrentEditor } from '@tiptap/react'
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
    QuoteIcon,
    Redo2Icon,
    SquareCheckIcon,
    StrikethroughIcon,
    Undo2Icon,
} from 'lucide-react'
import { SmallIconButton } from '../ui/custom/icon-button'
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarMenu,
    MenubarShortcut,
    MenubarTrigger,
} from '../ui/menubar'

export function EditorMenubar(props: { pos: { y: number } }) {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div
            className="absolute z-10"
            style={{
                top: `${25 + props.pos.y}px`,
            }}
        >
            <Menubar className="bg-background">
                <SmallIconButton
                    size="icon"
                    variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    icon={<BoldIcon size={16} />}
                />

                <SmallIconButton
                    size="icon"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
                    icon={<ItalicIcon size={16} />}
                />

                <SmallIconButton
                    size="icon"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
                    icon={<StrikethroughIcon size={16} />}
                />

                <SmallIconButton
                    size="icon"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    variant={editor.isActive('code') ? 'secondary' : 'ghost'}
                    icon={<CodeIcon size={16} />}
                />

                <SmallIconButton
                    size="icon"
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    variant={
                        editor.isActive('codeBlock') ? 'secondary' : 'ghost'
                    }
                    icon={<FileCode2Icon size={16} />}
                />

                <SmallIconButton
                    size="icon"
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    variant={
                        editor.isActive('blockquote') ? 'secondary' : 'ghost'
                    }
                    icon={<QuoteIcon size={16} />}
                />

                <SmallIconButton
                    size="icon"
                    variant="ghost"
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    icon={<CornerDownLeftIcon size={16} />}
                />

                <SmallIconButton
                    size="icon"
                    onClick={() =>
                        editor.chain().focus().toggleTaskList().run()
                    }
                    variant={
                        editor.isActive('taskList') ? 'secondary' : 'ghost'
                    }
                    icon={<SquareCheckIcon size={16} />}
                />

                <MenubarMenu>
                    <MenubarTrigger className="flex items-center gap-2">
                        <ListIcon size={16} />
                        <span>List</span>
                    </MenubarTrigger>

                    <MenubarContent>
                        <MenubarCheckboxItem
                            checked={editor.isActive('bulletList')}
                            onClick={() =>
                                editor.chain().focus().toggleBulletList().run()
                            }
                        >
                            Bullet list
                        </MenubarCheckboxItem>
                        <MenubarCheckboxItem
                            checked={editor.isActive('orderedList')}
                            onClick={() =>
                                editor.chain().focus().toggleOrderedList().run()
                            }
                        >
                            Ordered list
                        </MenubarCheckboxItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger className="flex items-center gap-2">
                        <span>Size</span>
                    </MenubarTrigger>

                    <MenubarContent>
                        <MenubarCheckboxItem
                            checked={editor.isActive('paragraph')}
                            onClick={() =>
                                editor.chain().focus().setParagraph().run()
                            }
                        >
                            Paragraph
                        </MenubarCheckboxItem>
                        <MenubarCheckboxItem
                            checked={editor.isActive('heading', { level: 1 })}
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 1 })
                                    .run()
                            }
                        >
                            Heading 1
                            <MenubarShortcut>
                                <Heading1Icon />
                            </MenubarShortcut>
                        </MenubarCheckboxItem>
                        <MenubarCheckboxItem
                            checked={editor.isActive('heading', { level: 2 })}
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 2 })
                                    .run()
                            }
                        >
                            Heading 2
                            <MenubarShortcut>
                                <Heading2Icon />
                            </MenubarShortcut>
                        </MenubarCheckboxItem>
                        <MenubarCheckboxItem
                            checked={editor.isActive('heading', { level: 3 })}
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 3 })
                                    .run()
                            }
                        >
                            Heading 3
                            <MenubarShortcut>
                                <Heading3Icon />
                            </MenubarShortcut>
                        </MenubarCheckboxItem>
                    </MenubarContent>
                </MenubarMenu>

                <SmallIconButton
                    size="icon"
                    variant="ghost"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    icon={<Undo2Icon size={16} />}
                />

                <SmallIconButton
                    size="icon"
                    variant="ghost"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    icon={<Redo2Icon size={16} />}
                />
            </Menubar>
        </div>
    )
}
