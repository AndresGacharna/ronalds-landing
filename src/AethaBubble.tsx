import { useEffect, useState } from 'react'
import { ArrowIcon, CloseIcon } from './icons'

const DISMISS_KEY = 'aetha-bubble-dismissed'

const COPY = {
  default: 'Proteína, creatina y pre-entrenos con asesoría real.',
  tools: '¿Ya sacaste tu proteína? Encuéntrala en AETHA.',
}

function wasDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

type Props = {
  url: string
  hidden?: boolean
}

// Sponsored nudge for the ally. It waits until the hero is gone, gives way to the
// full ally section and the footer, and stays closed for the visit once dismissed.
export function AethaBubble({ url, hidden = false }: Props) {
  const [dismissed, setDismissed] = useState(wasDismissed)
  const [pastHero, setPastHero] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [inTools, setInTools] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const hero = document.querySelector('.hero')
    const tools = document.getElementById('calculadoras')
    const blockers = [...document.querySelectorAll('.ally, .foot')]
    const visible = new Set<Element>()

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0)
        else if (e.target === tools) setInTools(e.isIntersecting)
        else if (e.isIntersecting) visible.add(e.target)
        else visible.delete(e.target)
      }
      setBlocked(visible.size > 0)
    })
    for (const el of [hero, tools, ...blockers]) if (el) io.observe(el)
    return () => io.disconnect()
  }, [dismissed])

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // private mode: it just comes back next visit
    }
  }

  if (dismissed || hidden || !pastHero || blocked) return null

  return (
    <aside className="aetha-bubble" aria-label="Publicidad de AETHA, aliado">
      <a className="aetha-bubble-link" href={url} target="_blank" rel="noopener sponsored">
        <span className="aetha-bubble-tag">Aliado</span>
        <img src="/images/aetha/aetha-logo-light.png" alt="AETHA" width="486" height="115" />
        <span className="aetha-bubble-text">{inTools ? COPY.tools : COPY.default}</span>
        <span className="aetha-bubble-cta">
          <span>Ver tienda</span>
          <ArrowIcon />
        </span>
      </a>
      <button type="button" className="aetha-bubble-x" onClick={dismiss} aria-label="Cerrar publicidad de AETHA">
        <CloseIcon />
      </button>
    </aside>
  )
}
