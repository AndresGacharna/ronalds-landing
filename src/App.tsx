import { useCallback, useState } from 'react'
import { ArrowIcon, CloseIcon, InstagramIcon, MenuIcon, SparkIcon, WhatsAppIcon } from './icons'
import { Calculators } from './Calculators'
import { DEFAULT_MESSAGE, WhatsAppChat } from './WhatsAppChat'
import './App.css'

const INSTAGRAM = { handle: 'stevennruizz', url: 'https://www.instagram.com/stevennruizz/' }

const AETHA = { url: 'https://www.aetha.co' }

const SLOGANS = [
  'Top 1 en planes personalizados',
  'Presencial en Bogotá',
  'Online donde estés',
  'Más de un año en Smart Fit',
  'Entrenamiento a tu medida',
]

const TITLES = [
  { big: 'Top 1', small: 'en venta de planes personalizados en planta' },
  { big: '+1 año', small: 'entrenando en Smart Fit Bogotá' },
  { big: 'Entre sedes', small: 'apoyando a los líderes a subir encuestas y resultados' },
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
    alt: 'Ronald corrigiendo a un alumno en press de hombros con mancuernas',
    quote: 'Llegué sin técnica y con afán de subir peso. Me corrigió desde el primer día y ahora entreno con confianza.',
    name: 'Santiago M.',
    detail: 'Personalizado 1:1',
  },
  {
    img: '/images/opt/usuario2.webp',
    alt: 'Ronald guiando a una alumna en hip thrust con barra',
    quote: 'Me adapta la rutina según cómo llegue ese día. Nunca me he sentido juzgada, y los resultados se notan.',
    name: 'Laura G.',
    detail: 'Personalizado 1:1',
  },
  {
    img: '/images/opt/usuario3.webp',
    alt: 'Ronald acompañando a una señora mayor en la bicicleta estática',
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
        <a href="#top" className="bar-mark" aria-label="Ronald Ruiz, inicio">
          <img src="/images/logos/monograma-rr-blanco.svg" alt="" width="44" height="44" />
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
          <picture className="hero-photo">
            <source media="(max-width: 759px)" srcSet="/images/opt/banner-phone.webp" />
            <source media="(max-width: 1024px) and (orientation: portrait)" srcSet="/images/opt/banner-mobile.webp" />
            <img
              src="/images/opt/banner.webp"
              alt="Ronald Ruiz de brazos cruzados en un gimnasio iluminado con neón rojo"
              width="2400"
              height="793"
              fetchPriority="high"
            />
          </picture>

          <div className="hero-inner">
            <h1 id="hero-name" className="hero-name">
              <Lettering text="Ronald" />
              <Lettering text="Ruiz" />
            </h1>
            <p className="plaque">
              <span className="bolt" aria-hidden="true" />
              Personal trainer · Bogotá
              <span className="bolt" aria-hidden="true" />
            </p>
            <p className="hero-lede">
              Entrenamiento personalizado, presencial u online. Te escucho, adapto el plan a tu vida y le metemos toda la
              energía.
            </p>
            <ConeButton label="Escríbeme por WhatsApp" onClick={() => openChat()} />
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
              src="/images/opt/quiensoy-perfil.webp"
              alt="Retrato de Ronald Ruiz"
              width="480"
              height="600"
              loading="lazy"
            />
          </figure>

          <div className="about-copy">
            <h2 id="about-title" className="section-title">
              Me mandan a donde hay que <em>subir el nivel</em>.
            </h2>
            <p>
              Llevo más de un año en Smart Fit Bogotá, en planta, entrenando todos los días. Por los resultados me han
              trasladado entre sedes para apoyar a los líderes a mejorar la experiencia de los usuarios y las ventas. Y
              sigo ahí, en el piso del gimnasio.
            </p>
            <p>
              Cada persona llega con algo distinto: poco tiempo, una rodilla que molesta, pena de arrancar o ganas de
              ir por más. Mi trabajo es adaptarme a ti, no al revés, y que salgas de cada sesión con ganas de volver.
            </p>

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
                        `Hola Ronald, me interesa el plan ${plan.name}. ¿Me cuentas tarifas y horarios disponibles?`,
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
            <ConeButton size="xl" label="Hablar con Ronald" onClick={() => openChat()} />
          </div>
        </section>
      </main>

      <footer className="foot wrap">
        <span>© {new Date().getFullYear()} Ronald Ruiz · Personal trainer · Bogotá</span>
        <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
          <span>@{INSTAGRAM.handle}</span>
        </a>
      </footer>

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
