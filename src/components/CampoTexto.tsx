import type { ChangeEvent, InputHTMLAttributes } from 'react'

interface CampoTextoProps extends InputHTMLAttributes<HTMLInputElement> {
  rotulo: string
  name: string
  erro?: string
  multilinha?: boolean
  aoMudar: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function CampoTexto({ rotulo, name, erro, multilinha = false, aoMudar, ...props }: CampoTextoProps) {
  const classes = `w-full rounded-xl border-2 bg-white px-4 py-3 text-base outline-none transition focus:border-verde ${
    erro ? 'border-erro' : 'border-linha'
  }`

  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-semibold">
        {rotulo}
      </label>
      {multilinha ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          className={classes}
          onChange={aoMudar}
          required={props.required}
          minLength={props.minLength}
          maxLength={props.maxLength}
          value={props.value}
          placeholder={props.placeholder}
          aria-invalid={!!erro}
          aria-describedby={erro ? `${name}-erro` : undefined}
        />
      ) : (
        <input
          id={name}
          name={name}
          className={classes}
          onChange={aoMudar}
          aria-invalid={!!erro}
          aria-describedby={erro ? `${name}-erro` : undefined}
          {...props}
        />
      )}
      {erro && (
        <p id={`${name}-erro`} className="mt-1 text-sm font-medium text-erro">
          <span aria-hidden="true">⚠ </span>{erro}
        </p>
      )}
    </div>
  )
}

export default CampoTexto
