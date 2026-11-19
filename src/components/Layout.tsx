import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  const location = useLocation()

  // Volta para o topo ao trocar de página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
