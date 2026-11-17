interface TituloSecaoProps {
  rotulo?: string
  titulo: string
  texto?: string
  claro?: boolean
}

function TituloSecao({ rotulo, titulo, texto, claro = false }: TituloSecaoProps) {
  return (
    <div className="max-w-2xl">
      {rotulo && (
        <p className={`mb-3 text-sm font-semibold uppercase tracking-wider ${claro ? 'text-verde-claro' : 'text-tomate'}`}>
          {rotulo}
        </p>
      )}
      <h2 className={`text-3xl font-bold leading-tight md:text-4xl ${claro ? 'text-white' : ''}`}>{titulo}</h2>
      {texto && <p className={`mt-4 text-lg ${claro ? 'text-verde-claro' : 'text-cinza'}`}>{texto}</p>}
    </div>
  )
}

export default TituloSecao
