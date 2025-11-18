import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Orderbook from './pages/Orderbook'
import Markettrades from './pages/Markettrades'

function App() {
  return (
    <>
      <nav style={{ padding: '12px' }}>
        <Link to="/" style={{ marginRight: 12 }}>
          Home
        </Link>
        <Link to="/order-book">Order Book </Link>
        <Link to="/market-trades">Market Trades </Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order-book" element={<Orderbook />} />
          <Route path="/market-trades" element={<Markettrades />} />
        </Routes>
      </main>
    </>
  )
}

export default App
