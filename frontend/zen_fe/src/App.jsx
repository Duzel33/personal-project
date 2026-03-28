import { useState } from 'react'
import zen_wm from './assets/zen_wm3.png'
import JobForm from './components/JobForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={zen_wm} className="zen" alt="ZEN logo" />
        </div>

        <div>
          <h3>Please Choose what service you would like to schedule</h3>
        </div>

        <div>
          <JobForm />
        </div>
  
      </section>


      {/* <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
        </div>
        <div id="social">
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section> */}
    </>
  )
}

export default App
