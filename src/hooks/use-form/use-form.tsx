import { useCallback, useState } from 'react'
import type { ChangeEvent, FormEvent, RefObject } from 'react'

// Hook de formulário no mesmo modelo da aula 24 (Forms) do professor.

// Estado do formulário: qualquer campo, com qualquer valor
export interface FormState {
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Erros do formulário: cada chave é um campo e o valor é a mensagem
export interface ErrorsState {
  [key: string]: string
}

// Função que devolve erros de regra do projeto (os que o HTML não valida sozinho)
type SetCustomErrorsFunction = (form: HTMLFormElement, data: FormState) => ErrorsState

// Função chamada quando o formulário é enviado sem erros
type SubmitCallbackFunction = (values: FormState) => Promise<void>

type Campo = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

// Mensagens em português, para não depender do idioma do navegador
function mensagemDeErro(campo: Campo) {
  if (campo.validity.valueMissing) return 'Preencha este campo.'
  if (campo.validity.typeMismatch) return 'Digite um e-mail válido.'
  if (campo.validity.tooShort && 'minLength' in campo) return `Use pelo menos ${campo.minLength} caracteres.`
  if (campo.validity.patternMismatch) return 'Formato inválido.'
  if (campo.validity.rangeUnderflow) {
    return campo.type === 'date' ? 'Escolha uma data depois de hoje.' : `Use um valor a partir de ${'min' in campo ? campo.min : ''}.`
  }
  if (campo.validity.stepMismatch) {
    return 'step' in campo && campo.step === '1' ? 'Use um número inteiro.' : 'Use no máximo 2 casas depois da vírgula.'
  }
  if (campo.validity.badInput) return 'Digite um número válido.'
  return campo.validationMessage
}

const useForm = (
  formRef: RefObject<HTMLFormElement | null>, // Elemento do formulário
  initialState: FormState, // Estado inicial do formulário
  submitCallback: SubmitCallbackFunction, // Executada quando o envio dá certo
  errorCallback?: (error: Error) => Promise<void>, // Opcional, para erros
  setCustomErrors?: SetCustomErrorsFunction, // Opcional, para erros personalizados
) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<ErrorsState>({})
  const [errorsCount, setErrorsCount] = useState(0)

  // Validação padrão do HTML (required, type="email", minLength, pattern...)
  const validateDefault = useCallback(() => {
    const form = formRef.current
    if (form === null) {
      return {}
    }

    const newErrors: ErrorsState = {}
    if (!form.checkValidity()) {
      for (const element of Array.from(form.elements)) {
        const campo = element as Campo
        if (campo.name && !campo.validity.valid) {
          newErrors[campo.name] = mensagemDeErro(campo)
        }
      }
    }
    return newErrors
  }, [formRef])

  // Junta os erros padrão com os personalizados e conta o total
  const handleErrors = useCallback((dados: FormState) => {
    const form = formRef.current
    if (form === null) {
      return { validationErrors: {}, count: 0 }
    }

    const validationErrors: ErrorsState = {
      ...validateDefault(),
      ...setCustomErrors?.(form, dados),
    }
    const count = Object.keys(validationErrors).length
    setErrors(validationErrors)
    setErrorsCount(count)

    return { validationErrors, count }
  }, [formRef, validateDefault, setCustomErrors])

  // Envio do formulário
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Não deixa a página recarregar

    if (loading) {
      return
    }
    setLoading(true)

    const { count, validationErrors } = handleErrors(data)
    if (count > 0) {
      setLoading(false)
      if (errorCallback instanceof Function) {
        await errorCallback(new Error('Formulário inválido', { cause: validationErrors }))
      }
      return
    }

    try {
      await submitCallback(data)
    } catch (erro) {
      if (errorCallback instanceof Function) {
        await errorCallback(erro as Error)
      }
    }
    setLoading(false)
  }, [loading, handleErrors, data, submitCallback, errorCallback])

  // Atualiza o valor do campo e revalida só se já tiver aparecido erro
  const handleChange = useCallback((e: ChangeEvent<Campo>) => {
    const { name, value } = e.target
    const novosDados = { ...data, [name]: value }
    setData(novosDados)

    if (errorsCount > 0) {
      handleErrors(novosDados)
    }
  }, [data, errorsCount, handleErrors])

  // Volta o formulário ao estado inicial (usado depois de um envio com sucesso)
  const reset = useCallback(() => {
    setData(initialState)
    setErrors({})
    setErrorsCount(0)
  }, [initialState])

  return {
    data, // Dados do formulário
    errors, // Erros do formulário
    errorsCount, // Quantidade de erros
    loadingSubmit: loading, // Se está enviando
    handleChange, // Usar no onChange dos campos
    handleSubmit, // Usar no onSubmit do formulário
    reset,
  }
}

export default useForm
