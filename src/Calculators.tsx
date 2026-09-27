import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowIcon } from './icons'

type Tab = 'pr' | 'calorias' | 'proteina' | 'carbos' | 'creatina'

/** En dash with thin spaces, so ranges like "3 – 5" don't glue to the numbers. */
const DASH = ' – '

const TABS: { id: Tab; label: string }[] = [
  { id: 'pr', label: 'Peso máximo (1RM)' },
  { id: 'calorias', label: 'Calorías' },
  { id: 'proteina', label: 'Proteína' },
  { id: 'carbos', label: 'Carbohidratos' },
  { id: 'creatina', label: 'Creatina' },
]

const LIFTS = ['Sentadilla', 'Press de banca', 'Peso muerto', 'Press militar', 'Hip thrust', 'Remo con barra']

// NSCA: porcentaje del 1RM que corresponde a cada número de repeticiones.
const NSCA_PCT: Record<number, number> = {
  1: 100,
  2: 95,
  3: 93,
  4: 90,
  5: 87,
  6: 85,
  7: 83,
  8: 80,
  9: 77,
  10: 75,
  11: 70,
  12: 67,
}
const TRAINING_REPS = [2, 3, 4, 5, 6, 8, 10, 12]

// Proteína diaria en g por kg de peso corporal.
const GOALS = [
  { id: 'sin', label: 'No entreno', min: 0.83, max: 0.83 },
  { id: 'entreno', label: 'Entreno / ganar músculo', min: 1.4, max: 2.0 },
  { id: 'deficit', label: 'Bajar grasa entrenando', min: 1.8, max: 2.5 },
] as const

// Carbohidratos diarios (g/kg) según carga de entrenamiento: ACSM, AND y DC 2016.
const CARB_LOADS = [
  { id: 'no', label: 'No entreno', detail: 'Sin entrenamiento regular', min: 0, max: 0 },
  { id: 'ligera', label: 'Ligera', detail: 'Baja intensidad o técnica, poco tiempo', min: 3, max: 5 },
  { id: 'moderada', label: 'Moderada', detail: 'Alrededor de 1 hora al día', min: 5, max: 7 },
  { id: 'alta', label: 'Alta', detail: 'De 1 a 3 horas al día, intensidad moderada o alta', min: 6, max: 10 },
  { id: 'muy-alta', label: 'Muy alta', detail: 'De 4 a 5 horas o más al día', min: 8, max: 12 },
] as const

const SEXES = [
  { id: 'h', label: 'Hombre' },
  { id: 'm', label: 'Mujer' },
] as const

// Niveles de actividad física (PAL) de FAO/OMS/UNU 2004, valores de referencia de cada rango.
const ACTIVITY = [
  { id: 'sedentario', label: 'Sedentario o ligero', detail: 'Trabajo sentado, entrenas poco', pal: 1.53 },
  { id: 'activo', label: 'Activo o moderado', detail: 'Entrenas 3 a 5 días o trabajas de pie', pal: 1.76 },
  { id: 'vigoroso', label: 'Vigoroso', detail: 'Entrenas fuerte casi a diario o trabajo físico pesado', pal: 2.25 },
] as const

// Ajuste calórico y proteína (g/kg dentro de los rangos ISSN) por objetivo.
const TARGETS = [
  { id: 'bajar', label: 'Bajar grasa', delta: -500, protein: 2.2 },
  { id: 'mantener', label: 'Mantener', delta: 0, protein: 1.7 },
  { id: 'subir', label: 'Ganar músculo', delta: 350, protein: 1.7 },
] as const

function toNumber(value: string) {
  const n = parseFloat(value.replace(',', '.'))
  return Number.isFinite(n) ? n : NaN
}

/** Rounds to the nearest 2.5 kg, the smallest jump most gyms can load. */
function plate(kg: number) {
  return Math.round(kg / 2.5) * 2.5
}

function fmt(n: number, decimals = 0) {
  return n.toLocaleString('es-CO', { maximumFractionDigits: decimals, minimumFractionDigits: 0 })
}

function range(a: number, b: number, decimals = 0) {
  return a === b ? fmt(a, decimals) : `${fmt(a, decimals)}${DASH}${fmt(b, decimals)}`
}

type NumberFieldProps = {
  label: string
  unit: string
  value: string
  onChange: (v: string) => void
  min: number
  max: number
  step?: number
  error?: string
}

function NumberField({ label, unit, value, onChange, min, max, step = 1, error }: NumberFieldProps) {
  const id = useId()
  return (
    <div className={`calc-field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <div className="calc-input">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
        />
        <span aria-hidden="true">{unit}</span>
      </div>
      {error && (
        <p className="calc-error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  )
}

type ChipsProps<T extends string> = {
  label: string
  options: readonly { id: T; label: string }[]
  value: T
  onChange: (v: T) => void
}

function Chips<T extends string>({ label, options, value, onChange }: ChipsProps<T>) {
  return (
    <fieldset className="calc-chips">
      <legend>{label}</legend>
      <div>
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={o.id === value ? 'is-active' : ''}
            aria-pressed={o.id === value}
            onClick={() => onChange(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/** The standard a result is calculated under, plus its full references. */
function Standard({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="calc-refs">
      <summary>
        <span>Estándar:</span> {summary}
      </summary>
      <ul>{children}</ul>
    </details>
  )
}

function PrCalculator({ onAsk }: { onAsk: (msg: string) => void }) {
  const [lift, setLift] = useState(LIFTS[0])
  const [weight, setWeight] = useState('100')
  const [reps, setReps] = useState('4')

  const w = toNumber(weight)
  const r = Math.round(toNumber(reps))
  const wError = !(w > 0 && w <= 500) ? 'Escribe un peso entre 1 y 500 kg.' : undefined
  const rError = !(r >= 1 && r <= 12) ? 'Usa entre 1 y 12 repeticiones; la tabla de la NSCA llega hasta ahí.' : undefined
  const valid = !wError && !rError
  const max = valid ? w / (NSCA_PCT[r] / 100) : 0
  const maxShown = Math.round(max * 2) / 2

  return (
    <div className="calc-grid">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <Chips
          label="Ejercicio"
          options={LIFTS.map((l) => ({ id: l, label: l }))}
          value={lift}
          onChange={setLift}
        />
        <div className="calc-row">
          <NumberField label="Peso levantado" unit="kg" value={weight} onChange={setWeight} min={1} max={500} step={0.5} error={wError} />
          <NumberField label="Repeticiones" unit="reps" value={reps} onChange={setReps} min={1} max={12} error={rError} />
        </div>
        <p className="calc-hint">
          Usa una serie hecha con buena técnica y al fallo o a una repetición de él. En ejercicios de varias
          articulaciones como estos, la estimación es más precisa con 10 repeticiones o menos.
        </p>
      </form>

      <div className="calc-result" aria-live="polite">
        {valid ? (
          <>
            <p className="calc-result-label">Tu máximo estimado en {lift.toLowerCase()}</p>
            <p className="calc-big">
              {fmt(maxShown, 1)}
              <span>kg</span>
            </p>
            <table className="calc-table">
              <caption className="sr-only">Pesos de trabajo según porcentaje de tu máximo</caption>
              <thead>
                <tr>
                  <th scope="col">Repeticiones</th>
                  <th scope="col">% del máximo</th>
                  <th scope="col">Peso</th>
                </tr>
              </thead>
              <tbody>
                {TRAINING_REPS.map((n) => (
                  <tr key={n}>
                    <td>{n}</td>
                    <td>{NSCA_PCT[n]}%</td>
                    <td>{fmt(plate((max * NSCA_PCT[n]) / 100), 1)} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="calc-ask"
              onClick={() =>
                onAsk(
                  `Hola Ronald, hice ${r} reps con ${fmt(w, 1)} kg en ${lift.toLowerCase()} (máximo estimado ${fmt(maxShown, 1)} kg). ¿Me ayudas a armar un plan para subirlo?`,
                )
              }
            >
              Quiero subir este número
              <ArrowIcon />
            </button>
          </>
        ) : (
          <p className="calc-empty">Completa los datos para ver tu máximo estimado.</p>
        )}
        <Standard summary="tabla de %1RM y repeticiones de la NSCA">
          <li>
            NSCA (National Strength and Conditioning Association). <em>Essentials of Strength Training and
            Conditioning</em>, 4.ª ed. Haff y Triplett (eds.), 2016: relación entre porcentaje del 1RM y repeticiones
            máximas.
          </li>
          <li>El máximo se estima dividiendo el peso levantado por el porcentaje que la NSCA asigna a esas repeticiones.</li>
        </Standard>
      </div>
    </div>
  )
}

function CaloriesCalculator({ onAsk }: { onAsk: (msg: string) => void }) {
  const [sex, setSex] = useState<(typeof SEXES)[number]['id']>('h')
  const [age, setAge] = useState('28')
  const [weight, setWeight] = useState('75')
  const [height, setHeight] = useState('172')
  const [activity, setActivity] = useState<(typeof ACTIVITY)[number]['id']>('activo')
  const [target, setTarget] = useState<(typeof TARGETS)[number]['id']>('bajar')

  const a = Math.round(toNumber(age))
  const w = toNumber(weight)
  const h = toNumber(height)
  const aError = !(a >= 18 && a <= 90) ? 'Entre 18 y 90 años.' : undefined
  const wError = !(w >= 30 && w <= 250) ? 'Entre 30 y 250 kg.' : undefined
  const hError = !(h >= 130 && h <= 220) ? 'Entre 130 y 220 cm.' : undefined
  const valid = !aError && !wError && !hError

  const act = ACTIVITY.find((x) => x.id === activity)!
  const goal = TARGETS.find((x) => x.id === target)!
  // Mifflin-St Jeor
  const bmr = 10 * w + 6.25 * h - 5 * a + (sex === 'h' ? 5 : -161)
  const maintenance = bmr * act.pal
  const floor = Math.max(bmr, sex === 'h' ? 1500 : 1200)
  const raw = maintenance + goal.delta
  const kcal = Math.round(Math.max(raw, floor) / 10) * 10
  const floored = raw < floor
  const protein = Math.round(w * goal.protein)
  const fat = Math.round((kcal * 0.25) / 9)
  const carbs = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4))
  const water = sex === 'h' ? 2.5 : 2.0

  return (
    <div className="calc-grid">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <Chips label="Sexo" options={SEXES} value={sex} onChange={setSex} />
        <div className="calc-row calc-row-3">
          <NumberField label="Edad" unit="años" value={age} onChange={setAge} min={18} max={90} error={aError} />
          <NumberField label="Peso" unit="kg" value={weight} onChange={setWeight} min={30} max={250} step={0.5} error={wError} />
          <NumberField label="Estatura" unit="cm" value={height} onChange={setHeight} min={130} max={220} error={hError} />
        </div>
        <div>
          <Chips label="Nivel de actividad" options={ACTIVITY} value={activity} onChange={setActivity} />
          <p className="calc-hint calc-hint-tight">{act.detail}.</p>
        </div>
        <Chips label="Objetivo" options={TARGETS} value={target} onChange={setTarget} />
      </form>

      <div className="calc-result" aria-live="polite">
        {valid ? (
          <>
            <p className="calc-result-label">Calorías diarias para {goal.label.toLowerCase()}</p>
            <p className="calc-big">
              {fmt(kcal)}
              <span>kcal/día</span>
            </p>
            <dl className="calc-facts">
              <div>
                <dt>Mantenimiento</dt>
                <dd>{fmt(Math.round(maintenance / 10) * 10)} kcal</dd>
              </div>
              <div>
                <dt>Proteína ({fmt(goal.protein, 1)} g/kg)</dt>
                <dd>{fmt(protein)} g</dd>
              </div>
              <div>
                <dt>Grasas (25 % de las calorías)</dt>
                <dd>{fmt(fat)} g</dd>
              </div>
              <div>
                <dt>Carbohidratos (el resto)</dt>
                <dd>{fmt(carbs)} g</dd>
              </div>
              <div>
                <dt>Agua total al día</dt>
                <dd>≈ {fmt(water, 1)} L + lo que sudes</dd>
              </div>
            </dl>
            {floored && (
              <p className="calc-hint calc-hint-after">
                Ajustamos el resultado para no bajar de tu gasto basal ni del mínimo recomendado: un déficit mayor
                necesita acompañamiento profesional.
              </p>
            )}
            <button
              type="button"
              className="calc-ask"
              onClick={() =>
                onAsk(
                  `Hola Ronald, la calculadora me dio ${fmt(kcal)} kcal al día para ${goal.label.toLowerCase()} (${fmt(protein)} g de proteína, ${fmt(carbs)} g de carbohidratos y ${fmt(fat)} g de grasa). ¿Me armas el plan?`,
                )
              }
            >
              Armar mi plan
              <ArrowIcon />
            </button>
          </>
        ) : (
          <p className="calc-empty">Completa tus datos para calcular.</p>
        )}
        <Standard summary="Mifflin-St Jeor, FAO/OMS/UNU, ACSM, ISSN y EFSA">
          <li>
            Gasto basal: ecuación de Mifflin-St Jeor, la que la Academy of Nutrition and Dietetics considera más precisa
            en adultos sanos (Frankenfield y cols., <em>J Am Diet Assoc</em>, 2005).
          </li>
          <li>
            Nivel de actividad (PAL): FAO/OMS/UNU, <em>Human energy requirements</em>, 2004 (1,53 · 1,76 · 2,25).
          </li>
          <li>
            Bajar grasa: déficit de 500 kcal al día, alrededor de 0,5 kg por semana (ACSM, Donnelly y cols., 2009).
            Mínimos de 1.200 kcal (mujeres) y 1.500 kcal (hombres) sin supervisión (NIH/NHLBI).
          </li>
          <li>
            Ganar músculo: superávit moderado de unas 350 kcal; proteína dentro de los rangos de la ISSN (Aragon y
            cols., 2017; Jäger y cols., 2017).
          </li>
          <li>
            Grasas: 25 %, dentro del rango aceptable de 20{DASH}35 % de las Academias Nacionales de EE. UU. (AMDR).
          </li>
          <li>Agua: ingesta adecuada total (bebidas y alimentos) de la EFSA, 2010.</li>
        </Standard>
      </div>
    </div>
  )
}

function ProteinCalculator({ onAsk, shopUrl }: { onAsk: (msg: string) => void; shopUrl: string }) {
  const [weight, setWeight] = useState('70')
  const [goal, setGoal] = useState<(typeof GOALS)[number]['id']>('entreno')

  const w = toNumber(weight)
  const error = !(w >= 30 && w <= 250) ? 'Escribe tu peso entre 30 y 250 kg.' : undefined
  const g = GOALS.find((x) => x.id === goal)!
  const min = Math.round(w * g.min)
  const max = Math.round(w * g.max)
  const perMeal = Math.round(w * 0.25)
  const meals = Math.max(3, Math.round((min + max) / 2 / perMeal))

  return (
    <div className="calc-grid">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <NumberField label="Tu peso" unit="kg" value={weight} onChange={setWeight} min={30} max={250} step={0.5} error={error} />
        <Chips label="Situación" options={GOALS} value={goal} onChange={setGoal} />
        <p className="calc-hint">
          {g.min === g.max
            ? `${fmt(g.min, 2)} g por kg de peso al día: el mínimo para una persona sana que no entrena.`
            : `De ${fmt(g.min, 1)} a ${fmt(g.max, 1)} g por kg de peso al día.`}
        </p>
      </form>

      <div className="calc-result" aria-live="polite">
        {!error ? (
          <>
            <p className="calc-result-label">Proteína diaria</p>
            <p className="calc-big">
              {range(min, max)}
              <span>g/día</span>
            </p>
            <dl className="calc-facts">
              <div>
                <dt>Por comida (0,25 g/kg)</dt>
                <dd>≈ {fmt(perMeal)} g</dd>
              </div>
              <div>
                <dt>Repartido en</dt>
                <dd>
                  {fmt(meals)} comidas, cada 3{DASH}4 h
                </dd>
              </div>
            </dl>
            <div className="calc-actions">
              <button
                type="button"
                className="calc-ask"
                onClick={() =>
                  onAsk(
                    `Hola Ronald, peso ${fmt(w, 1)} kg (${g.label.toLowerCase()}). La calculadora me dio ${range(min, max)} g de proteína al día. ¿Me ayudas a organizarlo?`,
                  )
                }
              >
                Armar mi plan
                <ArrowIcon />
              </button>
              <a className="calc-shop" href={shopUrl} target="_blank" rel="noopener sponsored">
                Ver proteínas en
                <img className="calc-shop-logo" src="/images/aetha/aetha-logo-light.png" alt="AETHA" width="486" height="115" />
              </a>
            </div>
          </>
        ) : (
          <p className="calc-empty">Escribe tu peso para calcular.</p>
        )}
        <Standard summary="OMS/FAO/UNU e ISSN">
          <li>
            No entreno: nivel seguro de 0,83 g/kg al día para adultos sanos (OMS/FAO/UNU, <em>Protein and amino acid
            requirements in human nutrition</em>, 2007).
          </li>
          <li>
            Entreno: 1,4{DASH}2,0 g/kg al día; por comida 0,25 g/kg (unos 20{DASH}40 g) cada 3{DASH}4 horas (ISSN,
            Jäger y cols., 2017).
          </li>
          <li>
            Bajar grasa entrenando: la ISSN indica 2,3{DASH}3,1 g por kg de masa magra; con un porcentaje de grasa
            promedio equivale a unos 1,8{DASH}2,5 g por kg de peso corporal.
          </li>
        </Standard>
      </div>
    </div>
  )
}

function CarbsCalculator({ onAsk }: { onAsk: (msg: string) => void }) {
  const [weight, setWeight] = useState('70')
  const [load, setLoad] = useState<(typeof CARB_LOADS)[number]['id']>('moderada')

  const w = toNumber(weight)
  const error = !(w >= 30 && w <= 250) ? 'Escribe tu peso entre 30 y 250 kg.' : undefined
  const l = CARB_LOADS.find((x) => x.id === load)!
  const training = l.id !== 'no'
  const min = Math.round(w * l.min)
  const max = Math.round(w * l.max)
  const dailyText = training ? range(min, max) : '130'

  return (
    <div className="calc-grid">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <NumberField label="Tu peso" unit="kg" value={weight} onChange={setWeight} min={30} max={250} step={0.5} error={error} />
        <div>
          <Chips label="Carga de entrenamiento" options={CARB_LOADS} value={load} onChange={setLoad} />
          <p className="calc-hint calc-hint-tight">{l.detail}.</p>
        </div>
        <p className="calc-hint">
          {training
            ? `De ${fmt(l.min)} a ${fmt(l.max)} g por kg de peso al día. Súbelos los días de más carga y bájalos los de descanso.`
            : 'Sin entrenamiento, el mínimo es de 130 g al día; lo ideal es que los carbohidratos aporten entre el 45 y el 65 % de tus calorías.'}
        </p>
      </form>

      <div className="calc-result" aria-live="polite">
        {!error ? (
          <>
            <p className="calc-result-label">{training ? 'Carbohidratos diarios' : 'Mínimo diario de carbohidratos'}</p>
            <p className="calc-big">
              {dailyText}
              <span>g/día</span>
            </p>
            {training ? (
              <dl className="calc-facts">
                <div>
                  <dt>Antes de entrenar (1{DASH}4 h antes)</dt>
                  <dd>
                    {range(Math.round(w * 1), Math.round(w * 4))} g
                  </dd>
                </div>
                <div>
                  <dt>Durante, si entrenas más de 1 hora</dt>
                  <dd>
                    {range(30, 60)} g por hora
                  </dd>
                </div>
                <div>
                  <dt>Recuperación rápida (si repites en menos de 8 h)</dt>
                  <dd>
                    {range(Math.round(w * 1), Math.round(w * 1.2))} g por hora, las primeras 4 h
                  </dd>
                </div>
              </dl>
            ) : (
              <dl className="calc-facts">
                <div>
                  <dt>Porcentaje ideal de tus calorías</dt>
                  <dd>
                    {range(45, 65)} %
                  </dd>
                </div>
              </dl>
            )}
            <button
              type="button"
              className="calc-ask"
              onClick={() =>
                onAsk(
                  `Hola Ronald, peso ${fmt(w, 1)} kg y mi carga de entrenamiento es ${l.label.toLowerCase()}. La calculadora me dio ${dailyText} g de carbohidratos al día. ¿Me ayudas a organizarlo?`,
                )
              }
            >
              Armar mi plan
              <ArrowIcon />
            </button>
          </>
        ) : (
          <p className="calc-empty">Escribe tu peso para calcular.</p>
        )}
        <Standard summary="posición conjunta ACSM, AND y Dietitians of Canada">
          <li>
            Thomas, Erdman y Burke. <em>Nutrition and Athletic Performance</em>, posición conjunta del American College
            of Sports Medicine, la Academy of Nutrition and Dietetics y Dietitians of Canada, 2016: 3{DASH}5, 5{DASH}7,
            6{DASH}10 y 8{DASH}12 g/kg al día según la carga; 1{DASH}4 g/kg de 1 a 4 horas antes; 30{DASH}60 g por
            hora durante sesiones de más de 1 hora; 1,0{DASH}1,2 g/kg por hora para recuperar rápido.
          </li>
          <li>
            No entreno: aporte mínimo de 130 g al día (RDA) y rango aceptable de 45{DASH}65 % de la energía (AMDR),
            Academias Nacionales de EE. UU., 2005.
          </li>
        </Standard>
      </div>
    </div>
  )
}

function CreatineCalculator({ onAsk, shopUrl }: { onAsk: (msg: string) => void; shopUrl: string }) {
  const [weight, setWeight] = useState('70')

  const w = toNumber(weight)
  const error = !(w >= 30 && w <= 250) ? 'Escribe tu peso entre 30 y 250 kg.' : undefined
  const loading = Math.round(w * 0.3)

  return (
    <div className="calc-grid">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <NumberField label="Tu peso" unit="kg" value={weight} onChange={setWeight} min={30} max={250} step={0.5} error={error} />
        <p className="calc-hint">
          Creatina monohidratada, todos los días (también los de descanso), con agua o con una comida. El momento del
          día importa poco; la constancia sí.
        </p>
      </form>

      <div className="calc-result" aria-live="polite">
        {!error ? (
          <>
            <p className="calc-result-label">Dosis diaria de mantenimiento</p>
            <p className="calc-big">
              {range(3, 5)}
              <span>g/día</span>
            </p>
            <dl className="calc-facts">
              <div>
                <dt>
                  Carga opcional, 5{DASH}7 días (0,3 g/kg)
                </dt>
                <dd>
                  ≈ {fmt(loading)} g/día en 4 tomas de {fmt(Math.round(loading / 4))} g
                </dd>
              </div>
              <div>
                <dt>Sin carga</dt>
                <dd>Reservas llenas en unas 4 semanas</dd>
              </div>
              <div>
                <dt>Deportistas grandes o con mucha masa muscular</dt>
                <dd>{range(5, 10)} g/día</dd>
              </div>
            </dl>
            <div className="calc-actions">
              <button
                type="button"
                className="calc-ask"
                onClick={() =>
                  onAsk(
                    `Hola Ronald, peso ${fmt(w, 1)} kg y quiero empezar con creatina (${range(3, 5)} g/día según la calculadora). ¿Me asesoras?`,
                  )
                }
              >
                Preguntarle a Ronald
                <ArrowIcon />
              </button>
              <a className="calc-shop" href={shopUrl} target="_blank" rel="noopener sponsored">
                Ver creatinas en
                <img className="calc-shop-logo" src="/images/aetha/aetha-logo-light.png" alt="AETHA" width="486" height="115" />
              </a>
            </div>
          </>
        ) : (
          <p className="calc-empty">Escribe tu peso para calcular.</p>
        )}
        <Standard summary="posición oficial de la ISSN sobre creatina">
          <li>
            ISSN (International Society of Sports Nutrition), posición sobre la suplementación con creatina: Kreider y
            cols., <em>J Int Soc Sports Nutr</em>, 2017. Carga de 0,3 g/kg al día durante 5{DASH}7 días; mantenimiento
            de 3{DASH}5 g al día; deportistas grandes, 5{DASH}10 g al día. Sin carga, 3 g diarios llenan las reservas
            en unos 28 días.
          </li>
        </Standard>
      </div>
    </div>
  )
}

export function Calculators({ onAsk, shopUrl }: { onAsk: (msg: string) => void; shopUrl: string }) {
  const [tab, setTab] = useState<Tab>('pr')
  const baseId = useId()

  const onKeyDown = (e: KeyboardEvent) => {
    const i = TABS.findIndex((t) => t.id === tab)
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const next = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length]
      setTab(next.id)
      document.getElementById(`${baseId}-tab-${next.id}`)?.focus()
    }
  }

  return (
    <div className="calc">
      <div className="calc-tabs" role="tablist" aria-label="Calculadoras" onKeyDown={onKeyDown}>
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`${baseId}-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`${baseId}-panel`}
            tabIndex={tab === t.id ? 0 : -1}
            className={tab === t.id ? 'is-active' : ''}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        className="calc-panel"
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${tab}`}
      >
        {tab === 'pr' && <PrCalculator onAsk={onAsk} />}
        {tab === 'calorias' && <CaloriesCalculator onAsk={onAsk} />}
        {tab === 'proteina' && <ProteinCalculator onAsk={onAsk} shopUrl={shopUrl} />}
        {tab === 'carbos' && <CarbsCalculator onAsk={onAsk} />}
        {tab === 'creatina' && <CreatineCalculator onAsk={onAsk} shopUrl={shopUrl} />}
      </div>
      <p className="calc-note">
        Son estimaciones orientativas para adultos sanos, calculadas con estándares internacionales (toca «Estándar»
        en cada resultado para ver las fuentes). Si tienes alguna condición médica, estás embarazada o eres menor de
        edad, consulta primero con un profesional de la salud.
      </p>
    </div>
  )
}
