import '@picocss/pico/css/pico.min.css'
import './App.css'
import React from 'react'

const App = () => {
  return (
    <main className="content">
      <Textarea />
    </main>
  )
}

function Textarea() {
  const [text, setText] = React.useState('This is an example text.')
  const [cursor, setCursor] = React.useState<number | null>(null)

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
