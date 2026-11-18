import { Route, Routes } from 'react-router-dom'
import Sobre from './pages/Sobre'
import Integrantes from './pages/Integrantes'
import IntegranteDetalhe from './pages/IntegranteDetalhe'
import Contato from './pages/Contato'

function App() {
  return (
    <Routes>
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/integrantes" element={<Integrantes />} />
      <Route path="/integrantes/:id" element={<IntegranteDetalhe />} />
      <Route path="/contato" element={<Contato />} />
    </Routes>
  )
}

export default App
