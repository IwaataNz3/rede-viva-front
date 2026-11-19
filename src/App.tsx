import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Integrantes from './pages/Integrantes'
import IntegranteDetalhe from './pages/IntegranteDetalhe'
import Faq from './pages/Faq'
import Contato from './pages/Contato'
import Vitrine from './pages/Vitrine'
import Painel from './pages/Painel'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/ofertas" element={<Vitrine />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/integrantes/:id" element={<IntegranteDetalhe />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />
      </Route>
    </Routes>
  )
}

export default App
