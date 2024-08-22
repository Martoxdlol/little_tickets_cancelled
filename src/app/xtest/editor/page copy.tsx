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
            <li />
        </div>
    )
}

function startEditor(element: HTMLDivElement) {
    if (element.getAttribute('editor-initialized') === 'true') {
        return
    }

    element.contentEditable = 'true'
    element.setAttribute('editor-initialized', 'true')

    element.addEventListener('input', (e) => {
        console.log('input', e)
        transformContent(element)
        document.getElementById('code')!.innerText = element.innerHTML
    })

    const observer = new MutationObserver((mutationList, observer) => {
        document.getElementById('code')!.innerText = element.innerHTML
    })

    observer.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
    })
}

function transformContent(container: HTMLElement) {
    const nodes = [...container.childNodes]

    for (const node of nodes) {
        transformContentNode(node)
    }
}

function transformContentNode(node: Node) {
    // allow p, ul, ol
    // transform text nodes to p
    // transform div to p
    clearAttributes(node)
    if (node instanceof HTMLParagraphElement) {
        transformParagraphContent(node)
    } else if (node instanceof HTMLDivElement || node instanceof Text) {
        const p = transformTo(node, 'p') as HTMLParagraphElement

        transformParagraphContent(p)
    } else if (
        node instanceof HTMLUListElement ||
        node instanceof HTMLOListElement
    ) {
        transformListContent(node)
    } else {
        // remove node
        console.log('content removing node', node)
        node.parentElement?.removeChild(node)
    }
}

function transformParagraphContent(node: HTMLParagraphElement) {
    // allow text nodes, allow strong, em, a
    // node.innerText = node.innerText
}

function transformListContent(node: HTMLUListElement | HTMLOListElement) {
    // allow li
    // transform text nodes to li
    // transform div to li
    const nodes = [...node.childNodes]
    clearAttributes(node)

    for (const node of nodes) {
        transformListContentNode(node)
    }
}

function transformListContentNode(node: Node) {
    clearAttributes(node)
    if (node instanceof HTMLLIElement) {
        transformContentOfList(node)
    } else if (node instanceof HTMLDivElement || node instanceof Text) {
        const li = transformTo(node, 'li') as HTMLLIElement
        transformContentOfList(li)
    } else if (
        node instanceof HTMLUListElement ||
        node instanceof HTMLOListElement
    ) {
        // put it on previous li or on an new <li><p><br></p>{here}</li>
        const prev = node.previousElementSibling
        if (prev && prev instanceof HTMLLIElement) {
            prev.appendChild(node)
        } else {
            const li = document.createElement('li')
            const p = document.createElement('p')
            p.innerHTML = '<br>'
            li.appendChild(p)
            for (const child of node.childNodes) {
                li.appendChild(child)
            }
            node.parentElement?.insertBefore(li, node.nextSibling)
            node.parentElement?.removeChild(node)
        }
    } else {
        // remove node
        console.log('list removing node', node)
        // node.parentElement?.removeChild(node)
    }
}

function transformContentOfList(container: HTMLElement) {
    transformContent(container)
    const first = [...container.childNodes][0]

    if (
        first instanceof HTMLUListElement ||
        first instanceof HTMLOListElement
    ) {
        const emptyParagraph = document.createElement('p')
        emptyParagraph.innerHTML = '<br>'
        first.parentElement?.insertBefore(emptyParagraph, first)
    }
}

function transformTo(node: Node, tagName: string): HTMLElement {
    if (node instanceof HTMLElement && node.tagName.toLowerCase() === tagName) {
        return node
    }

    if (node instanceof Text) {
        const p = document.createElement(tagName)
        p.innerText = node.textContent || ''
        node.parentElement?.insertBefore(p, node.nextSibling)
        node.parentElement?.removeChild(node)
        return p
    }
    const p = document.createElement(tagName)
    node.parentElement?.removeChild(node)
    for (const child of node.childNodes) {
        p.appendChild(child)
    }
    node.parentElement?.insertBefore(p, node.nextSibling)
    return p
}

function clearAttributes(node: Node) {
    if (node instanceof HTMLElement) {
        for (const attr of node.attributes) {
            console.log('clearing attr', attr)
            node.removeAttribute(attr.name)
        }
    }
}

// function transformContent(container: HTMLDivElement) {
//     const walker = document.createTreeWalker(container)

//     let node = walker.nextNode()
//     while (node) {
//         if (node instanceof HTMLDivElement) {
//             const p = document.createElement('p')
//             p.innerText = node.textContent || ''
//             node.parentElement?.insertBefore(p, node.nextSibling)
//             node.parentElement?.removeChild(node)
//         }
//         node = walker.nextNode()
//     }
// }

// function traverseContent(container: HTMLDivElement) {
//     // const nodes = container.childNodes
//     // const nodesToRemove: Node[] = []
//     // for (const node of nodes) {
//     //     if (node instanceof Text) {
//     //         const prev = node.previousElementSibling
//     //         if (prev && prev instanceof HTMLParagraphElement) {
//     //             prev.appendChild(node)
//     //         } else {
//     //             const p = document.createElement('p')
//     //             p.innerText = node.textContent || ''
//     //             node.parentElement?.insertBefore(p, node.nextSibling)
//     //             nodesToRemove.push(node)
//     //         }
//     //     } else if (node instanceof HTMLDivElement) {
//     //         const p = document.createElement('p')
//     //         p.innerText = node.textContent || ''
//     //         node.parentElement?.insertBefore(p, node.nextSibling)
//     //         nodesToRemove.push(node)
//     //     }
//     // }
//     // for (const node of nodesToRemove) {
//     //     node.parentNode?.removeChild(node)
//     // }
// }

// function treatRootNode(node: Node) {}
