# Invitación de casamiento — Juli & Joaco

Sitio web estático (HTML + CSS + JS, sin build) con la invitación de casamiento.
Fecha del evento: **05 de diciembre de 2026**, La Posada Multiespacio, 17:00 hs.

## Cómo trabajar en este repo

- Responder y comentar en **español**.
- **Confirmar con el usuario lo que se va a hacer antes de hacerlo.**
- **No hacer commit ni push hasta que el usuario lo pida.** La rama de trabajo es `claude/busy-ritchie-fpn680`.
- No crear Pull Requests salvo pedido explícito.

## Estructura

```
index.html        Página única: invitación + pop ups + sobre animado
css/styles.css    Estilos de la invitación y de los pop ups
css/sobre.css     Estilos del sobre animado (paleta bordó/crema)
js/config.js      ⭐ Links, código de descuento y alias (todo lo editable está acá)
js/main.js        Links, pop ups, botón copiar, animaciones al hacer scroll
js/sobre.js       Animación del sobre (sello → solapa → carta → invitación)
img/              Portada, fotos, títulos caligráficos, textura de papel, monograma
icons/            Iconos (SVG originales ICONO1-4 + PNG recortados del diseño)
```

## Diseño

- Paleta: bordó `#74252A`, crema `#E8DFD8`, malva (iconos) `#8E5D64`.
- Tipografías: **DM Sans** (texto) y **Playfair Display** itálica (subtítulos), ambas de Google Fonts.
  Los títulos caligráficos (Dulcinea / Editor's Note) son **imágenes PNG** recortadas del diseño,
  porque esas fuentes no son de uso web libre.
- La columna de la invitación mide máx. 480 px. Los tamaños usan `--u` (= 1 px del diseño original de 1080 px de ancho, escalado al ancho real).
- Secciones, en orden: Portada · Lugar y horario · Cronograma · Dress Code · Información adicional · Confirmación de asistencia · Regalos · Nuestra playlist · Cierre.
- Iconos animados (CSS, solo mientras están a la vista; se desactivan con `prefers-reduced-motion`):
  anillos (balanceo), martinis (brindis), cubiertos (flotan), bola de espejos (se balancea desde arriba), traje y vestido (cuelgan de la percha), gramófono (pulso).
- Los iconos `ICONO1` (martinis) e `ICONO2` (bola de espejos) son SVG originales de la diseñadora.
  Los demás (`anillos`, `cubiertos`, `traje-vestido`, `gramofono`) son PNG transparentes recortados de las páginas del diseño.

## Pop ups

- **Traslado → botón CONTACTO (2.º)**: contacto de Cavaci Travel + nombre de la empresa de alquiler de auto + **código de descuento con botón “Copiar código”**.
  (En el diseño original el código de descuento se veía en la página; ahora está solo dentro del pop up.)
- **Regalos → DATOS BANCARIOS**: **alias con botón “Copiar alias”**.

## ⏳ PENDIENTES

### Datos y links (completar en `js/config.js`)
Hoy todos los links apuntan a `https://www.google.com` como placeholder.
- [ ] `links.comoLlegar` — Google Maps de La Posada Multiespacio
- [ ] `links.hospedaje` — contacto del Wyndham Nordelta (WhatsApp / web)
- [ ] `links.traslado` — contacto de Cavaci Travel (WhatsApp / web)
- [ ] `links.rsvp` — formulario de confirmación de asistencia (**fecha límite: 15 de noviembre**)
- [ ] `links.calendar` — link “Agregar a Google Calendar”
- [ ] `links.playlist` — playlist colaborativa de Spotify
- [ ] `alquilerAuto.nombre` — empresa de alquiler de auto (hoy: `XXX Nombre`, se ve en **rojo** en la página)
- [ ] `alquilerAuto.codigo` — código de descuento (hoy: `XXXX`)
- [ ] `banco.alias` — alias para la luna de miel (hoy: `ALIAS.PLACEHOLDER`)

### Diseño / assets
- [ ] **Portada**: `img/portada.jpg` es la página completa del diseño con el título “JULI & JOACO” y el texto incluidos en la imagen (1079×1917). Para mejor calidad, pedir a la diseñadora: fondo **sin texto** + título en **SVG** (texto convertido a contornos).
- [ ] **Fotos**: `img/fotos.jpg` es la grilla 2×2 recortada del diseño (855×855). Pedir las 4 fotos originales en JPG (~1500 px) para mejor nitidez en pantallas retina.
- [ ] **Títulos caligráficos** (`img/title-*.png`) y **monograma** (`img/monograma.png`) están recortados de capturas de 1080 px. Ideal: SVG con texto en contornos desde Illustrator.
- [ ] **Iconos PNG** (`anillos`, `cubiertos`, `traje-vestido`, `gramofono`): pedir los SVG originales; reemplazar manteniendo las clases `anim anim-*`.
- [ ] `icons/ICONO3.svg` (moño con corazones J&J) e `ICONO4.svg` (copas de brindis con moños) **no se usan todavía** — definir dónde van (¿Regalos, Confirmación, el sobre?).
- [ ] Textura de papel: `img/papel.jpg` es un mosaico espejado generado a partir del diseño; reemplazar por la textura original si la tienen.

### Sobre animado
- [ ] El código original apuntaba a un sitio de Canva dentro de un `<iframe>`. Ahora la carta revela la invitación de esta misma página (sin iframe).
- [ ] Se recoloreó el sobre a bordó/crema (el original era verde oscuro/dorado). Confirmar con los novios.
- [ ] Texto de la carta del sobre: “Te invitamos a / nuestro casamiento” — confirmar o cambiar.
- [ ] Sello: hoy muestra dos círculos entrelazados (anillos). Evaluar usar el monograma J&J.
- [ ] Se agregó el botón “Entrar sin animación” bajo el sobre (no estaba en el original).

### Contenido a revisar
- [ ] Texto de la sección Confirmación: “completar un formulario por persona” — ¿cambiar a “completá”?
- [ ] Probar en celulares reales (iOS Safari y Android Chrome): sobre, pop ups y botón de copiar.
- [ ] Pasar la tipografía de Google Fonts a archivos locales si se quiere funcionar sin conexión.

### Publicación
- [x] Subido a la rama `main` (a pedido del usuario) para publicar con **GitHub Pages** (Settings → Pages → Deploy from a branch → `main` / `/ (root)`). El sitio queda **público**, con las fotos de la pareja.
- [ ] Verificar que GitHub Pages esté activo y anotar acá el link final.
- [ ] Definir dominio propio (opcional) para compartir con los invitados.
- [ ] Revisar metadatos para compartir por WhatsApp (`<title>`, descripción, imagen Open Graph).
