import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Streamlit, withStreamlitConnection } from 'streamlit-component-lib-patch'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)
  const container = useRef(null)
  console.log("in app")
  useEffect(() => {
    if (container.current) {
      // @ts-ignore
      Streamlit.setFrameHeight(container.current.offsetHeight)
    }
  }, [])
  return (
    <div ref={container}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

const WP = withStreamlitConnection(App)
export default WP
