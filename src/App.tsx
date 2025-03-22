import '@picocss/pico/css/pico.min.css'
import './App.css'
import { useEffect, useId, useState } from 'react'

const loroIpsum =
  'Loro ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const App = () => {
  return (
    <main className="content">
      <Textarea />
    </main>
  )
}

function Textarea() {
  const id = useId()
  const [text, setText] = useState(loroIpsum)
  const [cursor, setCursor] = useState<number | null>(null)

  useEffect(() => {
    function handleSelectionChange() {
      const selection = window.getSelection()

      console.log('selection', selection)
      if (
        selection?.anchorNode &&
        selection.isCollapsed &&
        selection.anchorNode.nodeType === Node.TEXT_NODE &&
        selection.anchorNode.parentElement?.getAttribute('data-textarea-id') ===
          id
      ) {
        setCursor(selection.anchorOffset)
      } else {
        console.log(selection?.anchorNode?.nodeName)
        if (selection?.anchorNode?.nodeName !== 'P') {
          setCursor(null)
        }
      }
    }

    document.addEventListener('selectionchange', handleSelectionChange)

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [id])

  return (
    <>
      <h1>Textarea</h1>
      <p data-textarea-id={id}>
        {cursor != null ? (
          <>
            {text.slice(0, cursor)}
            <Cursor />
            {text.slice(cursor)}
          </>
        ) : (
          text
        )}
      </p>
      <h2>Internal state</h2>
      <pre>{JSON.stringify({ text, cursor }, undefined, 2)}</pre>
    </>
  )
}

function Cursor() {
  return <span className="cursor">&nbsp;</span>
}

export default App
