import { Link } from 'react-router-dom'
import Logo from './Logo'

function Footer() {
  return (
    <footer className="bg-verde-escuro text-verde-claro">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <Logo claro />
          <p className="mt-4 max-w-xs">
            Sobras da promoção dos supermercados com desconto para famílias do CadÚnico.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="mb-3 font-texto text-sm font-semibold uppercase tracking-wider text-white">Páginas</h2>
          <ul className="grid grid-cols-2 gap-1">
            <li><Link to="/" className="inline-flex min-h-11 items-center hover:text-white">Início</Link></li>
            <li><Link to="/sobre" className="inline-flex min-h-11 items-center hover:text-white">Sobre</Link></li>
            <li><Link to="/ofertas" className="inline-flex min-h-11 items-center hover:text-white">Ofertas</Link></li>
            <li><Link to="/painel" className="inline-flex min-h-11 items-center hover:text-white">Painel da loja</Link></li>
            <li><Link to="/integrantes" className="inline-flex min-h-11 items-center hover:text-white">Integrantes</Link></li>
            <li><Link to="/faq" className="inline-flex min-h-11 items-center hover:text-white">FAQ</Link></li>
            <li><Link to="/contato" className="inline-flex min-h-11 items-center hover:text-white">Contato</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 font-texto text-sm font-semibold uppercase tracking-wider text-white">Projeto</h2>
          <p>Global Solution 2026/2 · FIAP</p>
          <p>Análise e Desenvolvimento de Sistemas, 1TDSR</p>
          <p className="mt-2">Equipe LuminaTech</p>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-sm">
        Rede Viva · {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer
