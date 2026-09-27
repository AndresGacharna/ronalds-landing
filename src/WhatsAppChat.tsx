import { useEffect, useRef, useState } from 'react'
import { CloseIcon, SendIcon, WhatsAppIcon } from './icons'

const PHONE = '573117744796'

export const DEFAULT_MESSAGE =
  'Hola Ronald, vi tus servicios de personal trainer. Quisiera consultar tarifas, horarios disponibles y si manejas planes presenciales u online.'

const GREETING = '¡Hola! 👋 Soy Ronald. Cuéntame qué quieres lograr y armamos tu plan. Te respondo por WhatsApp.'

function whatsappUrl(text: string) {
  const params = new URLSearchParams({
    phone: PHONE,
    text,
    type: 'phone_number',
    app_absent: '0',
  })
  return `https://api.whatsapp.com/send/?${params.toString()}`
}

function timeNow() {
  return new Date().toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' })
}

type Props = {
  open: boolean
  draft: string
  onDraftChange: (text: string) => void
  onOpen: () => void
  onClose: () => void
}

export function WhatsAppChat({ open, draft, onDraftChange, onOpen, onClose }: Props) {
  const [typing, setTyping] = useState(true)
  const [stamp, setStamp] = useState('')
  const [teaser, setTeaser] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)

  // Each time the chat opens, Ronald "types" before the greeting lands.
  useEffect(() => {
    if (!open) return
    setTeaser(false)
    setTyping(true)
    setStamp(timeNow())
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = window.setTimeout(() => setTyping(false), reduced ? 0 : 1400)
    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (open && !typing) inputRef.current?.focus({ preventScroll: true })
  }, [open, typing])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        fabRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // A single nudge after a while on the page, never repeated once dismissed or opened.
  useEffect(() => {
    const t = window.setTimeout(() => setTeaser(true), 9000)
    return () => window.clearTimeout(t)
  }, [])

  const send = () => {
    const text = draft.trim() || DEFAULT_MESSAGE
    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="wa">
      <section
        className={`wa-panel${open ? ' is-open' : ''}`}
        role="dialog"
        aria-label="Chat con Ronald"
        aria-hidden={!open}
        inert={!open}
      >
        <header className="wa-head">
          <img className="wa-avatar" src="/images/opt/avatar.webp" alt="" width="44" height="44" />
          <div className="wa-who">
            <strong>Ronald Ruiz</strong>
            <span aria-live="polite">{typing ? 'escribiendo…' : 'en línea'}</span>
          </div>
          <button type="button" className="wa-close" onClick={onClose} aria-label="Cerrar chat">
            <CloseIcon />
          </button>
        </header>

        <div className="wa-body">
          <p className="wa-day">Hoy</p>
          {typing ? (
            <div className="wa-bubble wa-typing" aria-label="Ronald está escribiendo">
              <span />
              <span />
              <span />
            </div>
          ) : (
            <div className="wa-bubble wa-in">
              <p>{GREETING}</p>
              <time>{stamp}</time>
            </div>
          )}
        </div>

        <form
          className="wa-compose"
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <label htmlFor="wa-msg" className="sr-only">
            Tu mensaje para Ronald
          </label>
          <textarea
            id="wa-msg"
            ref={inputRef}
            rows={4}
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
          />
          <button type="submit" className="wa-send" aria-label="Enviar por WhatsApp" disabled={typing}>
            <SendIcon />
          </button>
        </form>
        <p className="wa-note">Al enviar se abre WhatsApp con tu mensaje.</p>
      </section>

      {teaser && !open && (
        <div className="wa-teaser" role="status">
          <button type="button" className="wa-teaser-text" onClick={onOpen}>
            ¿Hablamos de tu plan?
          </button>
          <button
            type="button"
            className="wa-teaser-x"
            onClick={() => setTeaser(false)}
            aria-label="Descartar"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      <button
        ref={fabRef}
        type="button"
        className={`wa-fab${open ? ' is-open' : ''}`}
        onClick={open ? onClose : onOpen}
        aria-expanded={open}
        aria-label={open ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp con Ronald'}
      >
        {open ? <CloseIcon /> : <WhatsAppIcon />}
      </button>
    </div>
  )
}
