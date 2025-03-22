import '@picocss/pico/css/pico.min.css'
import './App.css'
import { useState } from 'react'

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
  const [text, setText] = useState(loroIpsum)
  const [cursor, setCursor] = useState<number | null>(null)

  return (
    <>
      <h1>Textarea</h1>
      <p>{text}</p>
      <h2>Internal state</h2>
      <pre>{JSON.stringify({ text, cursor }, undefined, 2)}</pre>
    </>
  )
}

export default App
