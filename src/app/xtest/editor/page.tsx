'use client'

import { useLayoutEffect } from 'react'
import { cn } from '~/lib/utils'

export default function Page() {
    return (
        <div className="bg-white p-4">
            <Editor />
            <pre className="mt-10" id="code"></pre>
        </div>
    )
}

function Editor() {
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

    element.addEventListener('input', (e) => {
        console.log('input', e)

        const isValid = validateTree(element)

        if (!isValid) {
            element.innerHTML = lastGoodHTML
        } else {
            lastGoodHTML = element.innerHTML
        }

        document.getElementById('code')!.innerText = element.innerHTML
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

// utils

function replaceNodeChild(oldChild: Node, newChild: Node) {
    oldChild.parentNode!.replaceChild(newChild, oldChild)
}
