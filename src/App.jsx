import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Sentinel from './Sentinel'
import Deepfake from './Deepfake'
import Url from './Url'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Routes>
        <Route path="/" element={<Sentinel />} />
        <Route path="/deepfake" element={<Deepfake />} />
        <Route path="/url" element={<Url />} />

      </Routes>
    </>
  )
}

export default App
