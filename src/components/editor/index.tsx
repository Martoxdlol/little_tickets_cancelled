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
    const [menuPosition, setMenuPosition] = useState<{
        y: number
        full: boolean
    }>()

    function handleMenuPos() {
        const selection = getSelection()
        const elem = selection?.focusNode?.parentElement
        if (elem && selection.rangeCount > 0) {
            setMenuPosition({
                // y:
                //     [...selection.getRangeAt(0).getClientRects()][0]
                //         ?.top ?? elem.offsetTop,
                y: elem.offsetTop,
                full:
                    selection.rangeCount <= 1 &&
                    selection.getRangeAt(0).startOffset -
                        selection.getRangeAt(0).endOffset !==
                        0,
            })
        } else {
            setMenuPosition(undefined)
        }
    }

    return (
        <div>
            <EditorProvider
                onSelectionUpdate={handleMenuPos}
                onTransaction={handleMenuPos}
                onFocus={handleMenuPos}
                slotBefore={
                    <>{menuPosition && <EditorMenubar pos={menuPosition} />}</>
                }
                extensions={extensions}
                content={''}
            ></EditorProvider>
        </div>
    )
}
