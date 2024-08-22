'use client'
import {
    EditorCommand,
    EditorCommandEmpty,
    EditorCommandItem,
    EditorCommandList,
    EditorContent,
    EditorRoot,
} from 'novel'
import { ImageResizer, handleCommandNavigation } from 'novel/extensions'
import { defaultExtensions } from './extensions'

import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { cn } from '~/lib/utils'
import { uploadFn } from './image-upload'
import { slashCommand, suggestionItems } from './slash-command'

const extensions = [...defaultExtensions, slashCommand]

const contentStylingClasses =
    'text-sm [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_p]:my-1'

const Editor = () => {
    return (
        <div className="relative w-full max-w-screen-lg">
            <EditorRoot>
                <EditorContent
                    initialContent={{
                        type: 'doc',
                        content: [],
                    }}
                    extensions={extensions}
                    className={cn(
                        'min-h-[50px] border-2 border-dashed',
                        '[&_.drag-handle]:absolute [&_.drag-handle]:size-8 [&_.drag-handle]:-translate-y-8 [&_.drag-handle]:bg-red-500',
                        contentStylingClasses,
                    )}
                    editorProps={{
                        handleDOMEvents: {
                            keydown: (_view, event) =>
                                handleCommandNavigation(event),
                        },
                        handlePaste: (view, event) =>
                            handleImagePaste(view, event, uploadFn),
                        handleDrop: (view, event, _slice, moved) =>
                            handleImageDrop(view, event, moved, uploadFn),
                        attributes: {
                            class: 'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
                        },
                    }}
                    onUpdate={({ editor }) => {
                        console.log(editor.getJSON())
                    }}
                    slotAfter={<ImageResizer />}
                >
                    <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                        <EditorCommandEmpty className="px-2 text-muted-foreground">
                            No results
                        </EditorCommandEmpty>
                        <EditorCommandList>
                            {suggestionItems.map((item) => (
                                <EditorCommandItem
                                    value={item.title}
                                    onCommand={(val) => item.command?.(val)}
                                    className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                                    key={item.title}
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </EditorCommandItem>
                            ))}
                        </EditorCommandList>
                    </EditorCommand>
                </EditorContent>
            </EditorRoot>
        </div>
    )
}

export default Editor
