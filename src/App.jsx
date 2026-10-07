import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import StatsApp from './StatsApp'
import TacticsBoard from './TacticsBoard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/stats" element={<StatsApp />} />
        <Route path="/tactics" element={<TacticsBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App