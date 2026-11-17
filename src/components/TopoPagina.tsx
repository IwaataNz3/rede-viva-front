interface TopoPaginaProps {
  rotulo?: string
  titulo: string
  texto?: string
  cor: 'mostarda' | 'tomate' | 'verde'
}

// Faixa colorida no topo das páginas internas. Cada página usa uma cor da paleta.
const estilos = {
  mostarda: { fundo: 'bg-mostarda', rotulo: 'text-verde-escuro', titulo: 'text-verde-escuro', texto: 'text-tinta' },
  tomate: { fundo: 'bg-tomate', rotulo: 'text-white', titulo: 'text-white', texto: 'text-white' },
  verde: { fundo: 'bg-verde-escuro', rotulo: 'text-mostarda', titulo: 'text-white', texto: 'text-verde-claro' },
}

function TopoPagina({ rotulo, titulo, texto, cor }: TopoPaginaProps) {
  const estilo = estilos[cor]

  return (
    <section className={estilo.fundo}>
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        {rotulo && <p className={`mb-3 text-sm font-semibold uppercase tracking-wider ${estilo.rotulo}`}>{rotulo}</p>}
        <h1 className={`max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl ${estilo.titulo}`}>{titulo}</h1>
        {texto && <p className={`mt-6 max-w-2xl text-lg md:text-xl ${estilo.texto}`}>{texto}</p>}
      </div>
    </section>
  )
}

export default TopoPagina
