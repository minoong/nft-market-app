import '@assets/css/styles.css'

import Button from '@components/Button'
import Component from '@components/Component'
import { useState } from 'react'

function App() {
 const [count, setCount] = useState(0)

 return (
  <div className="App bg-red-600">
   <header className="App-header">
    <img src="/logo.svg" className="App-logo" alt="logo" />
    <p>Vite Example!!</p>
    <Button />
    <p className="global-configured-sass">This text is styled by global configured SASS</p>
    <p className="imported-sass">This text is styled by imported SASS</p>
    <p className="load-path-sass">This text is styled by SASS from load paths</p>
    <p className="animate__animated animate__bounce">An animated element style using @use ~</p>
    <div className="animated fadeIn">
     <p>An animated element style using import ~</p>
     <p>Watch me fade in!</p>
    </div>
    <p>
     <button data-testid="increase" type="button" onClick={() => setCount((count) => count + 1)}>
      count is: <div data-testid="count">{count}</div>
     </button>
    </p>
    <p>
     Edit <code>App.tsx</code> and save to test HMR updates.
    </p>
    <p>
     <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
      Learn React
     </a>
     {' | '}
     <a className="App-link" href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener noreferrer">
      Vite Docs
     </a>
    </p>
   </header>
   <Component />
  </div>
 )
}

export default App
