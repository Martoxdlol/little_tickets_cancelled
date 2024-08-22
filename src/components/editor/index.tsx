import { useLayoutEffect } from 'react'
import { cn } from '~/lib/utils'

export function Editor() {
    useLayoutEffect(() => {
        const elem = document.getElementById('editor')
        if (!elem) {
            return
        }
        startEditor(elem as HTMLDivElement)
    }, [])
    return (
        <div
            id="editor"
            className={cn(
                'min-h-[150px] w-[300px] border-2 border-dashed outline-dashed outline-1',
                '[&_ul]:list-disc',
                '[&_ul]:pl-5',
            )}
        >
            <ul>
                <li>
                    <p>Asd</p>
                </li>
                <li>
                    <p>asd</p>
                </li>
                <li>
                    <p>
                        adsad
                        <br />
                    </p>
                </li>
                <li>
                    <p>Asd</p>
                </li>
                <li>
                    <p>asd</p>
                    <ul>
                        <li>
                            <p>Asd</p>
                        </li>
                        <li>
                            <p>asd</p>
                        </li>
                        <li>
                            <p>
                                adsad
                                <br />
                            </p>
                        </li>
                        <li>
                            <p>Asd</p>
                        </li>
                        <li>
                            <p>asd</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

function startEditor(element: HTMLDivElement) {
    let lastGoodHTML = element.innerHTML

    if (element.getAttribute('editor-initialized') === 'true') {
        return
    }

    element.contentEditable = 'true'
    element.setAttribute('editor-initialized', 'true')

    let lastSelection: Selection | null = null

    element.addEventListener('beforeinput', (e) => {
        const selection = getSelection()

        lastSelection = selection

        if (!selection) {
            e.preventDefault()
        }

        const node = selection?.focusNode
        const pos = selection?.focusOffset

        console.log(e.inputType)

        if (!e.cancelable) {
            return
        }

        if (e.inputType === 'deleteContentBackward') {
            if (node?.parentNode === element) {
                return
            }

            if (
                node instanceof HTMLParagraphElement &&
                pos == 0 &&
                node.parentNode! instanceof HTMLLIElement &&
                !node.parentNode.nextElementSibling
            ) {
                const li = node.parentNode
                const ul = li.parentNode!

                console.log(ul, li)

                node.remove()
                console.log(ul)
                insertAfter(node, ul)
                e.preventDefault()
                setSelection(node, pos)

                if (!node.parentNode.previousElementSibling) {
                    li.remove()
                }
            }
        }

        if (e.inputType === 'insertParagraph') {
            if (node instanceof HTMLParagraphElement) {
                // alert('yey')
                e.preventDefault()
                console.log('APPEND NEW LINE')
                if (
                    node.parentElement instanceof HTMLLIElement &&
                    !node.nextElementSibling
                ) {
                    const emptyListItem = createEmptyListItem()
                    node.parentNode!.parentNode!.appendChild(emptyListItem)
                    setSelection(emptyListItem.firstChild!, 0)
                } else {
                    const p = createEmptyParagraph()
                    insertAfter(p, node)
                    setSelection(p, 0)
                }
            }
        }

        validateTree(element)
    })

    element.addEventListener('input', (e) => {
        console.log('input', e)

        const isValid = validateTree(element)

        if (!isValid) {
            element.innerHTML = lastGoodHTML
            const focusedNode = lastSelection?.focusNode
            if (focusedNode instanceof HTMLElement) {
                resetSelection(lastSelection)
            }
        } else {
            lastGoodHTML = element.innerHTML
        }
    })
}

function validateTree(node: Node) {
    if (!(node instanceof HTMLDivElement) && !(node instanceof HTMLLIElement)) {
        console.warn('Invalid root tree node', node)
        return false
    }

    for (const child of node.childNodes) {
        if (!validateNode(child)) {
            console.warn('Invalid tree child', child)
            return false
        }
    }

    return true
}

function validateNode(node: Node) {
    if (node instanceof HTMLParagraphElement) {
        return validateParagraph(node)
    }

    if (node instanceof HTMLUListElement || node instanceof HTMLOListElement) {
        return validateListTree(node)
    }

    if (node instanceof HTMLDivElement) {
        const p = document.createElement('p')
        p.innerHTML = '<br>'
        replaceNodeChild(node, p)
        return true
    }

    return false
}

function validateParagraph(node: Node) {
    if (!(node instanceof HTMLParagraphElement)) {
        console.warn('Invalid paragraph', node)
        return false
    }

    if (node.childNodes.length === 0) {
        console.warn('Empty paragraph', node)
        return false
    }

    return true
}

function validateListTree(node: Node) {
    for (const child of node.childNodes) {
        if (!validateListItemTree(child)) {
            console.warn('Invalid list item', child)

            return false
        }
    }

    return true
}

function validateListItemTree(node: Node) {
    if (
        (node instanceof HTMLUListElement ||
            node instanceof HTMLOListElement) &&
        node.previousElementSibling instanceof HTMLLIElement
    ) {
        const prev = node.previousElementSibling
        const next = node.nextElementSibling
        node.remove()
        prev.appendChild(node)

        if (next instanceof HTMLLIElement) {
            next.remove()
        }

        return true
    }

    if (!(node instanceof HTMLLIElement)) {
        return false
    }

    if (node.childNodes.length === 0) {
        return false
    }

    let isFirstChild = true
    for (const child of node.childNodes) {
        if (isFirstChild) {
            if (!(child instanceof HTMLParagraphElement)) {
                console.warn('Invalid first list item child', child)
                return false
            }
            isFirstChild = false
        }

        if (!validateNode(child)) {
            console.warn('Invalid list item child', child)
            return false
        }
    }

    return true
}

// Creation
function createEmptyParagraph() {
    const emptyParagraph = document.createElement('p')
    emptyParagraph.innerHTML = '<br>'
    return emptyParagraph
}

function createEmptyListItem() {
    const emptyListItem = document.createElement('li')
    const emptyParagraph = createEmptyParagraph()
    emptyListItem.appendChild(emptyParagraph)
    return emptyListItem
}

// utils

function replaceNodeChild(oldChild: Node, newChild: Node) {
    oldChild.parentNode!.replaceChild(newChild, oldChild)
}

function setSelection(node: Node, pos: number) {
    getSelection()?.collapse(node, pos)
}

function resetSelection(selection?: Selection | null) {
    if (!selection) {
        return
    }

    getSelection()?.collapse(selection.focusNode, selection.focusOffset)
}

function insertAfter(node: Node, ref: Node) {
    ref.parentNode!.insertBefore(node, ref.nextSibling)
}
