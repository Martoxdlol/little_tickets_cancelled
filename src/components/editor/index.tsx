import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'

import './editor.css'
import { EditorMenubar } from './menubar'
const extensions = [
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    TaskItem,
    TaskList,
]

export function Editor() {
    const [menuPosition, setMenuPosition] = useState<{ y: number }>()

    return (
        <div>
            <EditorProvider
                onSelectionUpdate={(e) => {
                    const selection = getSelection()
                    const elem = selection?.focusNode?.parentElement
                    if (
                        elem &&
                        selection.rangeCount <= 1 &&
                        selection.getRangeAt(0).startOffset -
                            selection.getRangeAt(0).endOffset !==
                            0
                    ) {
                        setMenuPosition({ y: elem.offsetTop })
                    } else {
                        setMenuPosition(undefined)
                    }
                }}
                slotBefore={
                    <>{menuPosition && <EditorMenubar pos={menuPosition} />}</>
                }
                extensions={extensions}
                content={''}
            ></EditorProvider>
        </div>
    )
}
