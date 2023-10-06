import { useState } from 'react'
import './App.css'
import Home_page from './pages/Home_page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home_page />
    </>
  )
}

export default App
