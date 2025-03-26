import '@picocss/pico/css/pico.min.css'
import './App.css'
import { useEffect, useId, useRef, useState } from 'react'

const loroIpsum =
  'Loro ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const App = () => {
  return (
    <main className="content">
      <h1>Example 1</h1>
      <Example1 />
    </main>
  )
}

function Example1() {
  const id = useId()
  const [text, _setText] = useState(loroIpsum)
  const [caret, setCaret] = useState<number | null>(null)
  const [selection, setSelection] = useState<unknown | null>(null)
  const lastCaretChange = useRef<number | null>(null)

  useEffect(() => {
    function handleSelectionChange() {
      const selection = window.getSelection()

      if (selection) {
        setSelection({
          anchorNode: getNodeName(selection.anchorNode),
          anchorOffset: selection.anchorOffset,
          focusNode: getNodeName(selection.focusNode),
          focusOffset: selection.focusOffset,
          isCollapsed: selection.isCollapsed,
        })
      } else {
        setSelection(null)
      }

      if (currentTimestamp() - (lastCaretChange.current ?? 0) < 100) {
        return
      }

      if (
        selection?.anchorNode &&
        selection.isCollapsed &&
        selection.anchorNode.nodeType === Node.TEXT_NODE &&
        selection.anchorNode.parentElement?.getAttribute('data-textarea-id') ===
          id
      ) {
        setCaret(selection.anchorOffset)
      } else {
        setCaret(null)
      }

      lastCaretChange.current = currentTimestamp()
    }

    document.addEventListener('selectionchange', handleSelectionChange)

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [id])

  return (
    <>
      <h2>The text area</h2>
      <p data-textarea-id={id}>
        {caret != null ? (
          <>
            {text.slice(0, caret)}
            <Caret />
            {text.slice(caret)}
          </>
        ) : (
          text
        )}
      </p>
      <h2>Internal state</h2>
      <pre>{JSON.stringify({ text, caret, selection }, undefined, 2)}</pre>
    </>
  )
}

function currentTimestamp() {
  return new Date().getTime()
}

function getNodeName(node: Node | null) {
  if (node == null) return null
  if (!(node instanceof Element)) return node.nodeName

  return `<${node.nodeName.toLowerCase()} data-textarea-id=${node.getAttribute('data-textarea-id')}/>`
}

function Caret() {
  return <span className="caret">&nbsp;</span>
}

export default App
