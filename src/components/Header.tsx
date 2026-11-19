import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { para: '/', texto: 'Início' },
  { para: '/sobre', texto: 'Sobre' },
  { para: '/ofertas', texto: 'Ofertas' },
  { para: '/painel', texto: 'Painel da loja' },
  { para: '/integrantes', texto: 'Integrantes' },
  { para: '/faq', texto: 'FAQ' },
  { para: '/contato', texto: 'Contato' },
]

function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const location = useLocation()

  // Fecha o menu do celular sempre que a página muda
  useEffect(() => {
    setMenuAberto(false)
  }, [location.pathname])

  // Com o menu aberto, a página de trás não rola
  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : ''
  }, [menuAberto])

  function estiloLink({ isActive }: { isActive: boolean }) {
    return `flex min-h-11 items-center font-medium transition hover:text-verde ${
      isActive ? 'text-verde underline decoration-2 underline-offset-8' : 'text-tinta'
    }`
  }

  return (
    <header className="sticky top-0 z-30 border-b border-linha bg-creme">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:p-2">
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 md:px-8">
        <Logo />

        <nav aria-label="Menu principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.para}>
                <NavLink to={link.para} end className={estiloLink}>
                  {link.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full border border-linha md:hidden"
          aria-expanded={menuAberto}
          aria-controls="menu-celular"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <span className="text-xl leading-none" aria-hidden="true">{menuAberto ? '✕' : '☰'}</span>
        </button>
      </div>

      {menuAberto && (
        <nav id="menu-celular" aria-label="Menu do celular" className="fixed inset-x-0 bottom-0 top-18 z-30 overflow-y-auto bg-creme px-4 pt-6 md:hidden">
          <ul className="flex flex-col gap-2 text-2xl">
            {links.map((link) => (
              <li key={link.para} className="border-b border-linha">
                <NavLink to={link.para} end className={estiloLink}>
                  {link.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
