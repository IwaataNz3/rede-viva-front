import { Route, Routes } from 'react-router-dom'
import Contato from './pages/Contato'

function App() {
  return (
    <Routes>
      <Route path="/contato" element={<Contato />} />
    </Routes>
  )
}

export default App
