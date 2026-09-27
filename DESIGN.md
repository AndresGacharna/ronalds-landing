---
name: Ronald Ruiz · Personal trainer
description: El Picó. Un personal trainer presentado como picó bogotano, con rótulo geométrico sólido, cabina negra y un cono rojo que abre WhatsApp.
colors:
  ink: "#0d0c0c"
  grille: "#110f0f"
  panel: "#1e1b1b"
  rule: "#332e2e"
  bone: "#f3f4f6"
  bone-soft: "#d4cfcd"
  muted: "#b8b2b0"
  red: "#ff2a2a"
  red-hot: "#ff4747"
  red-deep: "#a8101a"
typography:
  display:
    fontFamily: "Adventor, Century Gothic, Avant Garde, sans-serif"
    fontSize: "min(9rem, 8.4vw)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Adventor, Century Gothic, Avant Garde, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Adventor, Century Gothic, Avant Garde, sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  tag: "4px"
  plate: "6px"
  inset: "8px"
  soft: "14px"
  card: "16px"
  frame: "18px"
  panel: "20px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  max: "1240px"
  section: "clamp(5rem, 10vw, 8.5rem)"
  stack-lg: "3.5rem"
  stack-md: "1.25rem"
components:
  button-whatsapp:
    backgroundColor: "{colors.red}"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.15rem"
  button-whatsapp-hover:
    backgroundColor: "{colors.red-hot}"
  button-cone:
    backgroundColor: "{colors.red}"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    size: "84px"
  button-plan:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.25rem"
  button-plan-hover:
    backgroundColor: "{colors.red}"
    textColor: "{colors.bone}"
  button-bone:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.35rem"
  plaque:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0.55rem 0.9rem"
  tag:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "0.2rem 0.6rem"
  slogan-strip:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "0.85rem 1.4rem"
  card-plan:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.bone}"
    rounded: "{rounded.card}"
    padding: "clamp(1.6rem, 3vw, 2.3rem) clamp(1.25rem, 3vw, 2.5rem)"
  chat-input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.bone}"
    typography: "{typography.body}"
    rounded: "{rounded.soft}"
    padding: "0.65rem 0.8rem"
---

# Design System: Ronald Ruiz · Personal trainer

## Overview

**Creative North Star: "El Picó"**

La página es un picó bogotano: una cabina negra que retumba, el nombre del dueño en mayúsculas geométricas enormes (RONALD en hueso, RUIZ en rojo sólido), títulos de campeón atornillados como placas y un cono de parlante que late como un bajo. Todo el sistema sale de ese objeto. Las superficies son negro de cabina con relieve de hardware (bordes finos, brillo interior de 1px, sombras largas y difusas). El rótulo en cambio es sobrio: tinta plana, sin cromo, sin extrusión, sin degradados. El único color caliente es el rojo del nombre y de la acción de WhatsApp.

La densidad es de cartel, no de dashboard: pocas piezas grandes por pantalla, titulares en Adventor bold en mayúsculas apretadas, lectura en Barlow a buen tamaño y todo lo demás en etiquetas condensadas espaciadas. El movimiento es parte del material: el nombre se revela una vez al cargar con un barrido de izquierda a derecha, el cono late en ciclo de bajo y la franja de lemas corre como marquesina.

Rechazos confirmados: la landing fitness genérica de foto + titular + tres tarjetas, y el lettering metálico (cromo con extrusión), que el usuario descartó.

**Key Characteristics:**
- Negro de cabina como lienzo; profundidad por tono, bordes de 1px y sombras largas negras.
- Rótulo en tinta plana: hueso sobre negro o negro sobre hueso, sin acabados metálicos ni degradados.
- Rojo #FF2A2A por ley: la palabra RUIZ del nombre y acciones de WhatsApp, nada más.
- Una sola display (Adventor, geométrica tipo Avant Garde) en mayúsculas bold; Barlow para leer; Barlow Condensed para rotular.
- Botones con forma de hardware de sonido: cono de parlante, píldoras, placas atornilladas.

## Colors

Negro de cabina casi neutro con un leve tinte cálido, hueso frío para el texto y un único rojo de señal.

### Primary
- **Rojo Picó** (red): la palabra RUIZ del nombre en el hero y toda acción que abre WhatsApp (botón de la barra, cono, botón flotante, enviar, CTA de plan en hover y en el plan destacado, borde del avatar y foco del campo del chat).
- **Rojo Encendido** (red-hot): estado hover de las acciones rojas de WhatsApp.
- **Rojo Hondo** (red-deep): el borde oscuro del núcleo rojo del cono. Es sombra del rojo, no un segundo acento.

### Neutral
- **Negro Cabina** (ink): fondo de página, texto sobre superficies hueso (franja de lemas, etiquetas, botón de aliado).
- **Rejilla** (grille): fondo de la sección de planes, bajo una trama de puntos de 9px que imita la rejilla del parlante.
- **Panel** (panel): superficies de tarjeta y placas (en la construcción aparecen como gradientes verticales #211e1e a #181515 y #2b2727 a #161313 alrededor de este valor).
- **Filete** (rule): bordes de 1px, divisores de lista y bordes de sección.
- **Hueso** (bone): texto principal, rótulo del nombre y titulares, fondo de la franja de lemas, del botón de aliado y de etiquetas.
- **Hueso Suave** (bone-soft): párrafos largos sobre negro (quién soy, detalles de plan, cierre).
- **Gris Parlante** (muted): texto secundario, taglines, pies de foto, pie de página y la frase de apoyo dentro de los titulares de sección.

### Named Rules
**The Red Law Rule.** El rojo #FF2A2A aparece solo en el nombre (RUIZ en el hero) y en acciones que abren WhatsApp. Si un elemento rojo no es el nombre ni lleva a WhatsApp, no es rojo. El aliado AETHA usa botón hueso, nunca rojo.

## Typography

**Display Font:** Adventor (TeX Gyre Adventor, clon libre de Avant Garde Gothic, autoalojada en OTF 400/700; con Century Gothic y Avant Garde)
**Body Font:** Barlow (con system-ui)
**Label Font:** Barlow Condensed 600/700

**Character:** Adventor bold es geometría de rótulo sin adornos, círculos llenos y mayúsculas apretadas; Barlow es la voz cercana que explica; Barlow Condensed rotula como las serigrafías de un equipo de sonido.

### Hierarchy
- **Display** (Adventor 700, min(9rem, 8.4vw) en escritorio y 17vw en móvil, line-height 0.9, tracking -0.02em, mayúsculas): solo el nombre, en dos líneas; RONALD en hueso y RUIZ en rojo, tinta plana.
- **Headline** (Adventor 700, clamp(2rem, 4.4vw, 3.5rem), 1.02, tracking -0.02em, mayúsculas): títulos de sección en hueso. El titular de cierre sube a clamp(2.6rem, 8.5vw, 7rem), también hueso plano.
- **Title** (Adventor 700, clamp(1.6rem, 2.6vw, 2.2rem), 1.05, tracking -0.02em, mayúsculas): nombres de plan; los títulos de logro usan 1.85rem. Los lemas de la franja abren el tracking a +0.02em; el monograma RR lo cierra a -0.03em.
- **Body** (Barlow 400, 1.0625rem, 1.6): lectura, con medidas de 34rem en el lede, 60ch en quién soy y 40 a 46ch en textos laterales.
- **Label** (Barlow Condensed 600/700, 0.75 a 1.4rem, tracking 0.04 a 0.16em, mayúsculas): navegación, botones, placas, etiquetas, nombres en testimonios. Más tracking cuanto más pequeña (0.14 a 0.16em en placas y etiquetas, 0.08em en botones).

### Named Rules
**The Sober Geometric Rule.** El rótulo es tinta plana en una sola display geométrica: hueso (o rojo en RUIZ) sobre negro, negro sobre hueso. Nunca cromo, degradados, extrusiones, trazos vaciados, sombras ni resplandores sobre texto. El metal vive en el hardware (tornillos, placas), no en las letras.

**The One Display Rule.** Adventor es la única display y siempre va en mayúsculas a peso 700 con tracking negativo (-0.02em); solo la franja de lemas lo abre a +0.02em. No se mezcla con otra display ni se usa para texto corrido.

**The Quiet Phrase Rule.** En los títulos de sección, la frase de apoyo baja a Adventor 400 en gris parlante; el contraste es de peso y tono, no de estilo. Sin cursivas.

## Layout

Contenedor central de min(1240px, 100% menos dos márgenes) con margen lateral clamp(1rem, 4vw, 3.5rem). Las secciones respiran con padding vertical fluido entre clamp(4rem, 8vw, 7rem) y clamp(6rem, 12vw, 10rem); dentro, los bloques se separan 3.5rem y las listas 1.25rem.

El hero es un banner a sangre de al menos 100svh con la foto a la derecha y el texto anclado abajo a la izquierda sobre un velo negro horizontal. La franja de lemas cruza el borde inferior del hero girada -1.6deg y más ancha que la ventana. Las secciones de contenido son grids asimétricos de dos columnas (5fr/6fr, 5fr/7fr); los planes son filas horizontales de tres columnas (identidad, detalle, acción), no tarjetas en rejilla; los testimonios son tres columnas con la del medio bajada 3.5rem.

Responsive: a 960px las columnas se apilan, los planes pasan a una columna y los testimonios se vuelven carrusel horizontal con scroll-snap (tarjetas de min(78%, 340px)). A 759px desaparece la navegación, el hero cambia a foto móvil con velo vertical y el nombre sube a 17vw.

## Elevation & Depth

Profundidad híbrida de equipo de sonido: tono sobre tono (negro, rejilla, panel) más bordes de 1px, un brillo interior de 1px blanco al 7-8% en placas y marcos, y sombras largas negras con spread negativo que caen hacia abajo. Las acciones rojas de WhatsApp son las únicas que emiten luz: halo rojo difuso bajo el botón, resplandor del núcleo del cono y onda que se expande. El texto nunca lleva sombra.

### Shadow Vocabulary
- **Caída de cabina** (`box-shadow: 0 24px 40px -32px #000`): tarjetas de plan; variantes más largas (0 30px 60px -36px, 0 40px 70px -35px) en banner de aliado y marco de retrato.
- **Placa atornillada** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08), 0 10px 24px -10px rgb(0 0 0 / 0.9)`): placas y marcos.
- **Caída de franja** (`box-shadow: 0 20px 40px -18px rgb(0 0 0 / 0.95)`): la franja de lemas sobre el hero.
- **Halo WhatsApp** (`box-shadow: 0 10px 24px -10px rgb(255 42 42 / 0.45)`): botón rojo de la barra; el botón flotante usa 0 14px 30px -10px rgb(255 42 42 / 0.7).
- **Plan destacado** (`box-shadow: 0 0 0 1px rgb(255 42 42 / 0.2), 0 28px 60px -34px rgb(255 42 42 / 0.55)`): el plan recomendado, cuya acción ya es WhatsApp en reposo.

### Named Rules
**The Only Red Glows Rule.** Nada emite luz salvo las acciones de WhatsApp. Las demás superficies se hunden en negro; no hay sombras de color neutras ni resplandores decorativos.

**The Soft Drop Rule.** Las sombras son largas, difusas y con spread negativo. Ni tarjetas, ni botones, ni texto llevan sombras duras desplazadas.

## Shapes

Hardware redondeado: todo lo que se pulsa es píldora (999px) o círculo (cono, botón flotante, enviar, cerrar). Los contenedores tienen esquinas suaves que crecen con el tamaño: etiquetas 4px, placas 6px, imagen interior 8px, fotos y campos 14px, tarjetas y banner 16px, marco de retrato 18px, panel de chat 20px. Los marcos llevan cuatro tornillos metálicos de 8px en las esquinas. Las burbujas del chat tienen una esquina recortada a 4px hacia su emisor.

## Components

### Buttons
Hardware de cabina: firme, rotulado, con luz solo cuando lleva a WhatsApp.
- **Shape:** píldora (999px), label en Barlow Condensed 700 mayúsculas con tracking 0.08em e ícono SVG a la izquierda (WhatsApp) o flecha a la derecha.
- **WhatsApp (barra):** rojo con texto blanco, padding 0.6rem 1.15rem, halo rojo. Hover a rojo encendido y sube 1px.
- **Plan:** contorno hueso de 1.5px sobre transparente, padding 0.8rem 1.25rem. En hover (y en reposo dentro del plan destacado) se llena de rojo porque abre WhatsApp con el plan prellenado; la flecha avanza 3px.
- **Bone (aliado):** hueso con texto negro, padding 0.85rem 1.35rem; hover a blanco. Es el botón para enlaces que no son WhatsApp.
- **Focus:** contorno de 2px con offset de 3px en todo control.

### Cone Button (signature)
Un parlante que late. Círculo de 84px (118px en la versión xl, 72/96px en móvil) con anillos de cono en gradiente radial y tres aros de borde en box-shadow; el núcleo rojo (58%) con el ícono de WhatsApp pulsa en ciclo de bajo de 1.8s (escala 1.11, rebote 0.97) mientras una onda roja se expande 1.4x y se desvanece. Al lado, la etiqueta en Barlow Condensed 1.2rem subrayada con 2px rojo. En hover el ciclo se acelera a 0.9s; al presionar, el núcleo baja a 0.94. Es la acción principal del hero y del cierre.

### Plaque & Tags
- **Plaque:** placa atornillada con gradiente #2b2727 a #161313, borde 1px #403a3a, radio 6px, brillo interior; texto label 1rem con tracking 0.16em entre dos tornillos. Rotula el oficio bajo el nombre.
- **Tag:** hueso sobre negro o negro traslúcido sobre imagen, radio 4px, label 0.75 a 0.8rem con tracking 0.14em. Marca estado ("Recomendado") o divulgación de patrocinio ("Aliado").

### Cards / Containers
- **Corner Style:** 16px en planes y banner, 14px en fotos de testimonio, 18px en el marco de retrato.
- **Background:** gradiente vertical de panel (#211e1e a #181515) sobre la rejilla de puntos.
- **Shadow Strategy:** caída de cabina; el plan destacado cambia a borde rojo al 60% con halo rojo (ver Elevation).
- **Border:** 1px filete.
- **Internal Padding:** clamp(1.6rem, 3vw, 2.3rem) vertical por clamp(1.25rem, 3vw, 2.5rem) horizontal.
- **Listas internas:** viñeta de guion de 0.6rem por 2px en gris.

### Inputs / Fields
- **Style:** campo del chat en #221e1e con borde 1px #3a3434, radio 14px, texto hueso, cursor rojo.
- **Focus:** el borde pasa a rojo, sin contorno extra (el campo pertenece a la acción de WhatsApp).
- **Disabled:** el botón de enviar baja a 45% de opacidad mientras Ronald "escribe".

### Navigation
Barra absoluta sobre el hero, sin fondo: monograma RR en Adventor 700 hueso (tracking -0.03em) a la izquierda, enlaces en Barlow Condensed 600 0.95rem, tracking 0.14em, mayúsculas, gris claro que pasa a blanco con subrayado de 2px en hover; botón rojo de WhatsApp a la derecha. En móvil los enlaces se ocultan y quedan monograma y botón.

### WhatsApp Chat (signature)
Botón flotante rojo de 62px abajo a la derecha con onda que se repite; se vuelve gris oscuro con una X al abrir. El panel (370px, radio 20px, fondo #141212) crece desde la esquina con escala 0.92 a 1. Cabecera con gradiente de panel y avatar con aro rojo; cuerpo con trama de puntos de 8px, píldora de fecha y burbujas #282323 con esquina recortada; secuencia "escribiendo…" con tres puntos que saltan antes del mensaje. Solo redirige a WhatsApp al enviar. Un globo hueso de invitación aparece encima del botón.

### Slogan Strip (signature)
Franja plana hueso girada -1.6deg, más ancha que la ventana, que monta el borde del hero con caída negra larga; lemas en Adventor 700 clamp(1rem, 1.6vw, 1.35rem), tracking +0.02em, en negro cabina, separados por destellos de cuatro puntas, corriendo en marquesina de 42s.

## Do's and Don'ts

### Do:
- **Do** reservar el rojo #FF2A2A para el nombre (RUIZ) y las acciones que abren WhatsApp; cualquier otro enlace usa hueso.
- **Do** escribir nombre, títulos y titulares en Adventor 700 mayúsculas, tracking -0.02em, tinta plana; la frase de apoyo del titular en Adventor 400 gris parlante.
- **Do** construir contenedores como hardware: gradiente de panel, borde de 1px filete, brillo interior de 1px y caída larga negra.
- **Do** usar píldora (999px) o círculo para todo lo que se pulsa.
- **Do** mover las cosas como equipo de sonido: easing cubic-bezier(0.16, 1, 0.3, 1), el nombre se revela en barrido una sola vez, el cono late en ciclo de 1.8s, y todo se detiene con prefers-reduced-motion.

### Don't:
- **Don't** volver a la landing fitness genérica de foto + titular + tres tarjetas; los planes son filas de programación, no una rejilla de precios.
- **Don't** usar rojo para enlaces, íconos, destacados o fondos que no llevan a WhatsApp, ni para el aliado AETHA.
- **Don't** añadir una segunda display o usar Adventor en minúscula o para texto corrido.
- **Don't** dar acabados metálicos, degradados, extrusiones, trazos vaciados, sombras ni resplandores al texto.
- **Don't** poner sombras duras desplazadas en tarjetas, botones o texto.
