import { useCallback, useState } from 'react'
import { ArrowIcon, CloseIcon, InstagramIcon, MenuIcon, SparkIcon, WhatsAppIcon } from './icons'
import { AethaBubble } from './AethaBubble'
import { Calculators } from './Calculators'
import { DEFAULT_MESSAGE, WhatsAppChat } from './WhatsAppChat'
import './App.css'

const INSTAGRAM = { handle: 'stevennruizz', url: 'https://www.instagram.com/stevennruizz/' }

const AETHA = { url: 'https://www.aetha.co' }

const SLOGANS = [
  'Más de 6 años de experiencia',
  'Presencial en Bogotá',
  'Online donde estés',
  'Entrenamiento a tu medida',
]

const TITLES = [
  { big: 'Top 1', small: 'en servicio de entrenamiento personalizado' },
  { big: '+6 años', small: 'entrenando personas en deportes y gimnasio' },
  { big: 'Cuerpo + mente', small: 'hábitos, disciplina y confianza que se quedan contigo' },
]

// Planes de referencia: nombres y alcances provisionales, sin tarifas publicadas.
const PLANS = [
  {
    name: 'Arranque',
    tagline: 'Para empezar con buena base.',
    mode: 'Presencial · 2 sesiones por semana',
    items: ['Valoración inicial y objetivos', 'Técnica desde cero, sin afanes', 'Rutina guiada para tus días solo'],
  },
  {
    name: 'Personalizado 1:1',
    tagline: 'Conmigo al lado en cada serie.',
    mode: 'Presencial · 3 a 5 sesiones por semana',
    items: ['Plan de progresión mes a mes', 'Medidas y seguimiento mensual', 'Ajustes según cómo llegues ese día'],
    featured: true,
  },
  {
    name: 'Online',
    tagline: 'Tu plan, en tu gimnasio o en casa.',
    mode: 'A distancia · seguimiento semanal',
    items: ['Rutina en video, paso a paso', 'Revisión de técnica por video', 'Acompañamiento por WhatsApp'],
  },
]

// TESTIMONIOS DE EJEMPLO: reemplazar por testimonios reales antes de publicar.
const TESTIMONIALS = [
  {
    img: '/images/opt/usuario1.webp',
    alt: 'Steven corrigiendo a un alumno en press de hombros con mancuernas',
    quote: 'Llegué sin técnica y con afán de subir peso. Me corrigió desde el primer día y ahora entreno con confianza.',
    name: 'Santiago M.',
    detail: 'Personalizado 1:1',
  },
  {
    img: '/images/opt/usuario2.webp',
    alt: 'Steven guiando a una alumna en hip thrust con barra',
    quote: 'Me adapta la rutina según cómo llegue ese día. Nunca me he sentido juzgada, y los resultados se notan.',
    name: 'Laura G.',
    detail: 'Personalizado 1:1',
  },
  {
    img: '/images/opt/usuario3.webp',
    alt: 'Steven acompañando a una señora mayor en la bicicleta estática',
    quote: 'Pensé que el gimnasio no era para mí. Con su paciencia ahora vengo feliz tres veces por semana.',
    name: 'Marta R.',
    detail: 'Plan Arranque',
  },
]

function Lettering({ text, className = '' }: { text: string; className?: string }) {
  return <span className={`lettering ${className}`}>{text}</span>
}

function ConeButton({ label, onClick, size = 'lg' }: { label: string; onClick: () => void; size?: 'lg' | 'xl' }) {
  return (
    <button type="button" className={`cone-cta cone-${size}`} onClick={onClick}>
      <span className="cone" aria-hidden="true">
        <span className="cone-dust">
          <WhatsAppIcon />
        </span>
      </span>
      <span className="cone-label">{label}</span>
    </button>
  )
}

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [draft, setDraft] = useState(DEFAULT_MESSAGE)

  const openChat = useCallback((message: string = DEFAULT_MESSAGE) => {
    setMenuOpen(false)
    setDraft(message)
    setChatOpen(true)
  }, [])
  const closeChat = useCallback(() => setChatOpen(false), [])

  return (
    <>
      <a className="skip" href="#quien-soy">
        Saltar al contenido
      </a>

      <header className="bar">
        <a href="#top" className="bar-mark" aria-label="Steven Ruiz, inicio">
          <img src="/images/logos/monograma-sr-rojo.svg" alt="" width="44" height="44" />
        </a>
        <nav id="menu" aria-label="Secciones" className={menuOpen ? 'is-open' : ''}>
          <a href="#quien-soy" onClick={() => setMenuOpen(false)}>
            Quién soy
          </a>
          <a href="#planes" onClick={() => setMenuOpen(false)}>
            Planes
          </a>
          <a href="#resultados" onClick={() => setMenuOpen(false)}>
            Alumnos
          </a>
          <a href="#calculadoras" onClick={() => setMenuOpen(false)}>
            Calculadoras
          </a>
        </nav>
        <button type="button" className="bar-cta" onClick={() => openChat()}>
          <WhatsAppIcon />
          <span>Escríbeme</span>
        </button>
        <button
          type="button"
          className="bar-menu"
          aria-expanded={menuOpen}
          aria-controls="menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      <main id="top">
        {/* HERO: la cabina */}
        <section className="hero" aria-labelledby="hero-name">
          <div className="hero-inner">
            <div className="hero-photo">
              <svg className="hero-globe" viewBox="-110 -84 220 168" aria-hidden="true">
                <g>
                  <ellipse className="globe-rim" rx="104" ry="78" />
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <ellipse key={i} className="globe-mer" rx="104" ry="78" style={{ animationDelay: `${i * -2.33}s` }} />
                  ))}
                  <path d="M-104 0H104M-90 -39H90M-90 39H90M-56 -66H56M-56 66H56" />
                </g>
              </svg>
              <img
                src="/images/opt/hero-steven.webp"
                alt="Steven Ruiz, entrenador personal, de brazos cruzados"
                width="1011"
                height="1400"
                fetchPriority="high"
              />
            </div>

            <div className="hero-copy">
              <h1 id="hero-name" className="hero-name">
                <img src="/images/logos/nombre-sr.svg" alt="Steven Ruiz" width="322" height="104" />
              </h1>
              <ul className="hero-chips" aria-label="Modalidad">
                <li className="plaque">
                  <span className="bolt" aria-hidden="true" />
                  Personal trainer · Bogotá
                </li>
                <li className="plaque plaque-ghost">Presencial + online</li>
              </ul>
              <p className="hero-lede">
                Entrenamiento personalizado, presencial u online. Te escucho, adapto el plan a tu vida y le metemos toda
                la energía.
              </p>
              <div className="hero-actions">
                <ConeButton label="Escríbeme por WhatsApp" onClick={() => openChat()} />
              </div>
            </div>
          </div>
        </section>

        {/* Franja de lemas */}
        <div className="slogans">
          <p className="sr-only">{SLOGANS.join(' · ')}</p>
          <div className="slogans-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className="slogans-set" key={copy}>
                {SLOGANS.map((s) => (
                  <span key={s}>
                    {s}
                    <SparkIcon className="spark" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* QUIÉN SOY */}
        <section id="quien-soy" className="about wrap" aria-labelledby="about-title">
          <figure className="about-photo">
            <img
              src="/images/opt/hero-steven.webp"
              alt="Retrato de Steven Ruiz de brazos cruzados"
              width="1011"
              height="1400"
              loading="lazy"
            />
          </figure>

          <div className="about-copy">
            <h2 id="about-title" className="section-title">
              No solo cambio cuerpos. Cambio <em>vidas</em>.
            </h2>
            <p>
              Llevo más de 6 años entrenando personas en deportes y en el gimnasio, y lo he visto una y otra vez: cuando
              alguien empieza a entrenar en serio, no cambia solo su cuerpo. Cambia cómo duerme, cómo come, cómo se ve
              al espejo y cómo enfrenta su día.
            </p>
            <p>
              Por eso no te entrego una rutina y ya. Te acompaño a construir hábitos, disciplina y confianza: un cuerpo
              más fuerte, una mente más firme y una versión de ti que no se rinde. Crecimiento en todos los aspectos.
            </p>
            <p>
              Llegues con poco tiempo, una rodilla que molesta, pena de arrancar o ganas de ir por más, tu plan se
              adapta a ti, no al revés. El primer paso es escribirme.
            </p>

            <div className="about-cta">
              <ConeButton
                label="Quiero mi plan personalizado"
                onClick={() =>
                  openChat('Hola Steven, quiero empezar mi entrenamiento personalizado. ¿Me cuentas cómo funciona?')
                }
              />
            </div>

            <ul className="titles" aria-label="Logros">
              {TITLES.map((t) => (
                <li key={t.big}>
                  <Lettering text={t.big} className="title-big" />
                  <span className="title-small">{t.small}</span>
                </li>
              ))}
            </ul>

            <a className="ig" href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              <span>@{INSTAGRAM.handle}</span>
            </a>
          </div>
        </section>

        {/* PLANES: la programación */}
        <section id="planes" className="plans" aria-labelledby="plans-title">
          <div className="wrap">
            <div className="plans-head">
              <h2 id="plans-title" className="section-title">
                Escoge cómo <em>entrenamos</em>.
              </h2>
              <p>
                La tarifa depende de la frecuencia y la modalidad. Escríbeme con el plan que te llame y te paso precios y
                horarios disponibles.
              </p>
            </div>

            <ol className="plan-list">
              {PLANS.map((plan) => (
                <li key={plan.name} className={`plan${plan.featured ? ' is-featured' : ''}`}>
                  <div className="plan-id">
                    {plan.featured && <span className="plan-flag">Recomendado</span>}
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-tagline">{plan.tagline}</p>
                  </div>
                  <div className="plan-detail">
                    <p className="plan-mode">{plan.mode}</p>
                    <ul>
                      {plan.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="plan-cta"
                    onClick={() =>
                      openChat(
                        `Hola Steven, me interesa el plan ${plan.name}. ¿Me cuentas tarifas y horarios disponibles?`,
                      )
                    }
                  >
                    Consultar tarifa
                    <ArrowIcon />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ALUMNOS */}
        <section id="resultados" className="people wrap" aria-labelledby="people-title">
          <h2 id="people-title" className="section-title">
            Así se entrena <em>conmigo</em>.
          </h2>
          <div className="people-grid">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="person">
                <div className="person-photo">
                  <img src={t.img} alt={t.alt} width="800" height="1000" loading="lazy" />
                </div>
                <blockquote>
                  <p>“{t.quote}”</p>
                </blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CALCULADORAS */}
        <section id="calculadoras" className="tools" aria-labelledby="tools-title">
          <div className="wrap">
            <div className="plans-head">
              <h2 id="tools-title" className="section-title">
                Haz tus <em>números</em>.
              </h2>
              <p>
                Calcula tu peso máximo estimado en los ejercicios principales, tus calorías del día y cuánta proteína,
                carbohidratos y creatina te convienen según tu peso y tu objetivo.
              </p>
            </div>
            <Calculators onAsk={openChat} shopUrl={AETHA.url} />
          </div>
        </section>

        {/* ALIADO: AETHA */}
        <section className="ally wrap" aria-labelledby="ally-title">
          <div className="ally-copy">
            <h2 id="ally-title" className="section-title">
              Recarga para <em>tu plan</em>.
            </h2>
            <p>
              El entrenamiento pone la mitad; lo que comes y suplementas pone la otra. En AETHA encuentras proteínas,
              creatina, pre-entrenos y más, con asesoría real y envíos rápidos en Bogotá.
            </p>
            <a className="ally-cta" href={AETHA.url} target="_blank" rel="noopener sponsored">
              Comprar suplementos en AETHA
              <ArrowIcon />
            </a>
          </div>
          <a className="ally-banner" href={AETHA.url} target="_blank" rel="noopener sponsored">
            <span className="ally-tag">Aliado</span>
            <img
              className="ally-logo"
              src="/images/aetha/aetha-logo-light.png"
              alt="AETHA, suplementos deportivos"
              width="486"
              height="115"
              loading="lazy"
            />
          </a>
        </section>

        {/* CIERRE */}
        <section className="close" aria-labelledby="close-title">
          <div className="wrap close-inner">
            <h2 id="close-title" className="close-title">
              <Lettering text="¿Arrancamos?" />
            </h2>
            <p>
              Cuéntame tu objetivo y tus horarios. Te respondo y armamos tu plan, presencial en Bogotá u online.
            </p>
            <ConeButton size="xl" label="Hablar con Steven" onClick={() => openChat()} />
          </div>
        </section>
      </main>

      <footer className="foot wrap">
        <span>© {new Date().getFullYear()} Steven Ruiz · Personal trainer · Bogotá</span>
        <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
          <span>@{INSTAGRAM.handle}</span>
        </a>
      </footer>

      <AethaBubble url={AETHA.url} hidden={chatOpen} />

      <WhatsAppChat
        open={chatOpen}
        draft={draft}
        onDraftChange={setDraft}
        onOpen={() => openChat()}
        onClose={closeChat}
      />
    </>
  )
}

export default App
