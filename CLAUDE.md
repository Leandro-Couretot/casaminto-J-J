# Invitación de casamiento — Juli & Joaco

Sitio web estático (HTML + CSS + JS, sin build) con la invitación de casamiento.
Fecha del evento: **05 de diciembre de 2026**, La Posada Multiespacio, 17:00 hs.

## Cómo trabajar en este repo

- Responder y comentar en **español**.
- **Confirmar con el usuario lo que se va a hacer antes de hacerlo** cuando el pedido sea ambiguo o grande. Para el push a `main` ya hay confirmación permanente (ver abajo).
- **Después de cada tanda de cambios: commit y push directo a `main` sin esperar confirmación** (el usuario lo mira en la página pública de GitHub Pages: “siempre subilo así lo veo”). Subir también a la rama de trabajo `claude/busy-ritchie-fpn680`.
  Antes de subir, probar el cambio en local. No crear Pull Requests salvo pedido explícito.

## Estructura

```
index.html        Página única: invitación + pop ups + sobre animado
css/styles.css    Estilos de la invitación y de los pop ups
css/sobre.css     Estilos del sobre animado (paleta bordó/crema)
js/config.js      ⭐ Links, código de descuento y alias (todo lo editable está acá)
js/main.js        Links, pop ups, botón copiar, animaciones al hacer scroll
js/sobre.js       Animación del sobre (sello → solapa → se funde con la invitación)
js/musica.js      Música de fondo (YouTube IFrame API) y botón de silenciar
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
  - anillos: giran despacio y brilla el diamante. Los iconos del cronograma se miden en `style="width:calc(N * var(--u))"` en `index.html`; **no** poner `width` en `.evt .icon-slot img` (pisa ese ancho y los deja enormes).
  - copas: **recreadas como SVG propio** (`icons/copas.svg`, inline en `index.html`), una por una y con trazo a mano, para que cada copa pivote desde su pie: se alejan, toman impulso, **chocan** con chispa y gotas, y rebotan. Estilo parecido a `ICONO1.svg` (que ya no se usa).
  - cubiertos: **sin animación** (imagen quieta, a pedido de la diseñadora).
  - bola de espejos: se balancea desde el hilo y tiene destellos.
  - traje y vestido: cuelgan de la percha y giran apenas (efecto 3D).
  - gramófono: late y salen notas musicales.
- Todo el contenido **aparece de a poco al hacer scroll** (clase `.reveal`, la agrega `js/main.js`; usa `translate` para no pisar las animaciones de los iconos).
- Tipografía de los **pop ups**: `--font-titulo` en `css/styles.css` (hoy *Pinyon Script*, parecida a la de los títulos). Ver pendientes.
- `ICONO2` (bola de espejos) es un SVG original de la diseñadora. `ICONO1` (martinis) quedó **sin usar**: lo reemplazan las copas recreadas (`icons/copas.svg`).
  Los demás (`anillos`, `cubiertos`, `traje-vestido`, `gramofono`) son PNG transparentes recortados de las páginas del diseño.

## Pop ups

- **Traslado → botón CONTACTO (2.º)**: contacto de Cavaci Travel + nombre de la empresa de alquiler de auto + **código de descuento con botón “Copiar código”**.
  (En el diseño original el código de descuento se veía en la página; ahora está solo dentro del pop up.)
- **Regalos → DATOS BANCARIOS**: **alias con botón “Copiar alias”**.

## Sobre y música

- Secuencia: toque en el sello (lacre con el monograma **J&J**, `img/sello-jj.png`) → se rompe → se abre la solapa → la carta asoma un poco y muestra la portada (`img/carta.jpg`, “JULI & JOACO”) → el sobre se acerca y se funde **directo** con la invitación. La carta **no** crece a pantalla completa.
- El mismo toque en el sello **arranca la música** (los navegadores exigen una interacción del usuario). Botón redondo abajo a la derecha para silenciar/reactivar.
- La música se configura en `js/config.js` → `musica` (`videoId` de YouTube, `volumen`, `inicio`). Con `videoId: ''` se desactiva y se oculta el botón.
- Si el video no se puede reproducir (privado, sin permiso para incrustar, sin conexión), el botón se oculta solo.

## ⏳ PENDIENTES

### Datos y links (completar en `js/config.js`)
Los links pendientes apuntan a `https://www.google.com` como placeholder.
- [ ] `links.comoLlegar` — Google Maps de La Posada Multiespacio
- [ ] `links.hospedaje` — contacto del Wyndham Nordelta (WhatsApp / web)
- [ ] `links.traslado` — contacto de Cavaci Travel (WhatsApp / web)
- [ ] `links.rsvp` — formulario de confirmación de asistencia (**fecha límite: 15 de noviembre**)
- [ ] `links.calendar` — link “Agregar a Google Calendar”
- [x] `links.playlist` — playlist de Spotify (cargada). Verificar que esté marcada como **colaborativa** en Spotify para que los invitados puedan sumar canciones
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

### Música
- [ ] Hoy suena **un video de YouTube** (`Vte_kf5CSSM`) en un reproductor casi invisible. **Es solo para probar**: no se pudo verificar desde el entorno de desarrollo (sin acceso a YouTube) que ese video permita incrustarse.
- [ ] Para la versión final, usar música **con licencia / libre de derechos** como archivo propio (`<audio>`), porque las canciones comerciales tienen derechos de autor y el reproductor de YouTube oculto va contra sus términos.
- [ ] Elegir canción definitiva, volumen y segundo de inicio.
- [ ] Probar en iPhone y Android: el audio solo arranca tras el toque en el sello.

### Tipografía
- [ ] Pop ups: usar la **fuente real** de los títulos (Dulcinea, de Adobe Fonts). Pedir a la diseñadora que cree un *Web Project* en fonts.adobe.com, pasar el link de CSS (se pega en el `<head>` de `index.html`, hay un comentario) y poner su nombre de familia al principio de `--font-titulo`. Alternativa: exportar como SVG los títulos de los pop ups ("Traslado y alquiler de auto", "Datos bancarios").

### Sobre animado
- [x] El código original apuntaba a un sitio de Canva dentro de un `<iframe>`; ahora el sobre se funde con la invitación de esta misma página (sin iframe).
- [ ] Se recoloreó el sobre a bordó/crema (el original era verde oscuro/dorado). Confirmar con los novios.
- [x] La carta del sobre muestra la portada (`img/carta.jpg`, imagen que pasó la diseñadora). Si cambia la portada, reemplazar ese archivo.
- [x] Sello con el monograma J&J (pedido de la diseñadora).
- [ ] Se agregó el botón “Entrar sin animación” bajo el sobre (no estaba en el original).

### Contenido a revisar
- [ ] Texto de la sección Confirmación: “completar un formulario por persona” — ¿cambiar a “completá”?
- [ ] Probar en celulares reales (iOS Safari y Android Chrome): sobre, música, animaciones, pop ups y botón de copiar.
- [ ] Pasar la tipografía de Google Fonts a archivos locales si se quiere funcionar sin conexión.

### Publicación
- [x] Primera versión subida a la rama `main` (a pedido del usuario) para publicar con **GitHub Pages** (Settings → Pages → Deploy from a branch → `main` / `/ (root)`). El sitio queda **público**, con las fotos de la pareja.
- [x] Segunda tanda (sobre, animaciones, música, pop ups, copas) subida a `main`.
- [x] Tercera tanda (carta del sobre con la portada, tamaño de anillos/bola de espejos, cubiertos sin animación) subida a `main`.
- [x] GitHub Pages activo: el sitio se abre en `leandro-couretot.github.io` (carpeta `casaminto-J-J`). Cada push a `main` se publica solo en 1-2 minutos.
- [ ] Definir dominio propio (opcional) para compartir con los invitados.
- [ ] Revisar metadatos para compartir por WhatsApp (`<title>`, descripción, imagen Open Graph).
