import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'

import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { HashtagNode } from '@lexical/hashtag'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { EDITOR_TRANSFORMERS } from './markdow-transformers'
import { Placeholder } from './placeholder'
import theme from './theme'
import { Toolbar } from './toolbar'

const URL_MATCHER =
    /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

const MATCHERS = [
    (text: string) => {
        const match = URL_MATCHER.exec(text)
        if (match === null) {
            return null
        }
        const fullMatch = match[0]
        return {
            index: match.index,
            length: fullMatch.length,
            text: fullMatch,
            url: fullMatch.startsWith('http')
                ? fullMatch
                : `https://${fullMatch}`,
            // attributes: { rel: 'noreferrer', target: '_blank' }, // Optional link attributes
        }
    },
]

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: unknown) {
    console.error(error)
}

export function Editor() {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
    }

    return (
        <LexicalComposer
            initialConfig={{
                ...initialConfig,
                nodes: [
                    ListNode,
                    ListItemNode,
                    HeadingNode,
                    QuoteNode,
                    AutoLinkNode,
                    LinkNode,
                    HorizontalRuleNode,
                    TableCellNode,
                    TableRowNode,
                    TableNode,
                    HashtagNode,
                    CodeHighlightNode,
                    CodeNode,
                ],
            }}
        >
            <div className="relative">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="outline-none" />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                    placeholder={
                        <Placeholder>Start typing here...</Placeholder>
                    }
                />
            </div>
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <AutoLinkPlugin matchers={MATCHERS} />
            <MarkdownShortcutPlugin transformers={EDITOR_TRANSFORMERS} />
            <Toolbar />
        </LexicalComposer>
    )
}
