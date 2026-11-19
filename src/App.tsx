import { Route, Routes } from 'react-router-dom'
import Sobre from './pages/Sobre'
import Integrantes from './pages/Integrantes'
import IntegranteDetalhe from './pages/IntegranteDetalhe'
import Contato from './pages/Contato'
import Vitrine from './pages/Vitrine'
import Painel from './pages/Painel'

function App() {
  return (
    <Routes>
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/ofertas" element={<Vitrine />} />
      <Route path="/painel" element={<Painel />} />
      <Route path="/integrantes" element={<Integrantes />} />
      <Route path="/integrantes/:id" element={<IntegranteDetalhe />} />
      <Route path="/contato" element={<Contato />} />
    </Routes>
  )
}

export default App