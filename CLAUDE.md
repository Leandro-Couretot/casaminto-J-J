# Invitación de casamiento — Juli & Joaco

Sitio web estático (HTML + CSS + JS, sin build) con la invitación de casamiento.
Fecha del evento: **05 de diciembre de 2026**, La Posada Multiespacio, 17:00 hs.

## Cómo trabajar en este repo

- Responder y comentar en **español**.
- **Confirmar con el usuario lo que se va a hacer antes de hacerlo** cuando el pedido sea ambiguo o grande. Para el push a `main` ya hay confirmación permanente (ver abajo).
- **Después de cada tanda de cambios: commit y push directo a `main` sin esperar confirmación** (el usuario lo mira en la página pública de GitHub Pages: “siempre subilo así lo veo”). Subir también a la rama de trabajo `claude/busy-ritchie-fpn680`.
  Antes de subir, probar el cambio en local. No crear Pull Requests salvo pedido explícito.
- **Anti-caché**: GitHub Pages deja el HTML en caché ~10 min, y si el navegador mezcla un HTML viejo con CSS/JS nuevos la página se rompe (pasó con los cubiertos).
  Por eso `index.html` carga CSS, JS y las imágenes que cambian (`img/carta.jpg`, `img/portada.jpg`, `img/portada-texto.png`) con `?v=AAAAMMDDx` (también `img/fotos.jpg`). **En cada tanda que se suba, cambiar ese `?v=` en todos los archivos de `index.html`** (y agregarlo a cualquier imagen que se reemplace con el mismo nombre).

## Estructura

```
index.html        Página única: invitación + pop ups + sobre animado
css/styles.css    Estilos de la invitación y de los pop ups
css/sobre.css     Estilos del sobre animado (paleta bordó/crema)
js/config.js      ⭐ Links, código de descuento y alias (todo lo editable está acá)
js/main.js        Links, pop ups, botón copiar, animaciones al hacer scroll
js/sobre.js       Animación del sobre (sello → solapa → se funde con la invitación)
js/musica.js      Música de fondo (YouTube IFrame API) y botón de silenciar
img/              Portada, fotos (`fotos.jpg`: grilla 2×2), títulos caligráficos, textura de papel, monograma
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

- **Traslado → botón CONTACTO (2.º)**: Cavaci Travel (botón “Contactar”) + alquiler de auto **Waycar Rental** (30 % de descuento, vigencia, botón “Ir al sitio”) + **código de descuento con botón “Copiar código”**.
  (En el diseño original el código se veía en la página; ahora está solo dentro del pop up.)
- **Regalos → DATOS BANCARIOS**: **dos cuentas** (pesos y USD), cada una con **alias y CBU** y su botón de copiar. Los datos salen de `js/config.js` → `banco.cuentas` (se pueden agregar más cuentas ahí).
  Ojo: al ser un sitio público, alias y CBU quedan visibles en el código para cualquiera que abra la página.

## Sobre y música

- Secuencia: toque en el sello (lacre con el monograma **J&J**, `img/sello-jj.png`) → se rompe → se abre la solapa → la carta asoma un poco y muestra la portada (`img/carta.jpg`, “JULI & JOACO”, versión con más aire arriba) → el sobre se acerca y se funde **directo** con la invitación. La carta **no** crece a pantalla completa.
- El mismo toque en el sello **arranca la música** (los navegadores exigen una interacción del usuario). Botón redondo abajo a la derecha para silenciar/reactivar.
- La música se configura en `js/config.js` → `musica` (`videoId` de YouTube, `volumen`, `inicio`). Con `videoId: ''` se desactiva y se oculta el botón.
- La sección **Nuestra playlist** tiene el **reproductor de Spotify embebido** (`#spotify` en `index.html`; toma la playlist de `js/config.js` → `links.playlist`, hoy “Juli & Joa - 5D”) y debajo el botón “Quiero colaborar”. Si el invitado toca el reproductor de Spotify, la música de fondo se **pausa sola** (`js/main.js` + `Musica.pause()`). Sin sesión iniciada, Spotify reproduce solo vistas previas de 30 s.
- Si el video no se puede reproducir (privado, sin permiso para incrustar, sin conexión), el botón se oculta solo.

## ⏳ PENDIENTES

### Datos y links (completar en `js/config.js`)
Los links pendientes apuntan a `https://www.google.com` como placeholder. Ya cargados: hospedaje, playlist, alquiler de auto y datos bancarios.
- [ ] `links.comoLlegar` — Google Maps de La Posada Multiespacio
- [x] `links.hospedaje` — cargado con la **ficha de Google** del Wyndham Nordelta Tigre (`share.google/...`). Si prefieren el WhatsApp o la web del hotel, cambiarlo
- [ ] `links.traslado` — contacto de Cavaci Travel (WhatsApp / web)
- [ ] `links.rsvp` — formulario de confirmación de asistencia (**fecha límite: 15 de noviembre**)
- [ ] `links.calendar` — link “Agregar a Google Calendar”
- [x] `links.playlist` — playlist **“Juli & Joa - 5D”** (`7LvauM5IuMQl19EpjGZUE7`, pasada por la organizadora; reemplaza a la de prueba `6fJRPqEHhDv3OePuHxS2Dt`). Verificar que esté marcada como **colaborativa** en Spotify para que los invitados puedan sumar canciones
- [x] `alquilerAuto` — **Waycar Rental**, código `JULIYJOACO`, 30 % de descuento, válido para reservas creadas entre el 28/11/2026 y el 14/12/2026 en sucursal de Buenos Aires (web: waycarrental.com)
- [x] `banco.cuentas` — cuenta en pesos (`JULIYJOACO.2026`) y cuenta en USD (`JULIYJOA.2026`), cada una con su CBU

### Diseño / assets
- [x] **Texto de la portada** “¡Nos casamos! y queremos celebrarlo con vos…”: ahora es una **capa aparte** (`img/portada-texto.png`, clase `.portada-texto` en `css/styles.css`) para poder moverlo. Ajuste pedido: **15 px más arriba y +3 pt de fuente** (36 → 39 pt, ×1,0833) en medidas del diseño de 1079 px de ancho. Para volver a moverlo/agrandarlo, tocar `width`, `left` y `top` de `.portada-texto`.
  `img/portada.jpg` ya no trae ese texto: se borró de la imagen y se rellenó el papel (hay un parche invisible de 670×122 px en esa zona). Si la diseñadora cambia la portada, hay que volver a separar el texto.
- [ ] **Portada**: `img/portada.jpg` sigue trayendo el título “JULI & JOACO” dibujado en la imagen (1079×1917). Para mejor calidad, pedir a la diseñadora: fondo **sin texto** + título en **SVG** (texto convertido a contornos).
- [x] **Fotos**: `img/fotos.jpg` es la **grilla nueva de 4 fotos** (pasada por el usuario, 1000×1003 px). Si se cambia de nuevo, usar el mismo nombre y subir el `?v=` en `index.html`.
- [ ] Fotos: si hay una versión de mayor resolución (4 fotos originales en JPG, ~1500 px), mejora la nitidez en pantallas retina.
- [ ] **Títulos caligráficos** (`img/title-*.png`) y **monograma** (`img/monograma.png`) están recortados de capturas de 1080 px. Ideal: SVG con texto en contornos desde Illustrator.
- [ ] **Iconos PNG** (`anillos`, `cubiertos`, `traje-vestido`, `gramofono`): pedir los SVG originales; reemplazar manteniendo las clases `anim anim-*`.
- [ ] `icons/ICONO3.svg` (moño con corazones J&J) e `ICONO4.svg` (copas de brindis con moños) **no se usan todavía** — definir dónde van (¿Regalos, Confirmación, el sobre?).
- [ ] Textura de papel: `img/papel.jpg` es un mosaico espejado generado a partir del diseño; reemplazar por la textura original si la tienen.

### Música
- [ ] Hoy suena **un video de YouTube** (`rbaoKL1Ei0c`) en un reproductor casi invisible. **Es solo para probar**: no se pudo verificar desde el entorno de desarrollo (sin acceso a YouTube) que ese video permita incrustarse.
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
- [ ] Probar en celulares reales (iOS Safari y Android Chrome): sobre, música, animaciones, pop ups y botón de copiar (alias y CBU).
- [ ] Revisar con la organizadora que el código de Waycar y sus fechas estén vigentes antes de mandar la invitación.
- [ ] Pasar la tipografía de Google Fonts a archivos locales si se quiere funcionar sin conexión.

### Publicación
- [x] Primera versión subida a la rama `main` (a pedido del usuario) para publicar con **GitHub Pages** (Settings → Pages → Deploy from a branch → `main` / `/ (root)`). El sitio queda **público**, con las fotos de la pareja.
- [x] Segunda tanda (sobre, animaciones, música, pop ups, copas) subida a `main`.
- [x] Tercera tanda (carta del sobre con la portada, tamaño de anillos/bola de espejos, cubiertos sin animación) subida a `main`.
- [x] Cuarta tanda (Spotify embebido, carta nueva, anti-caché) y quinta (datos reales: bancos, Waycar, hotel, playlist) subidas a `main`.
- [x] Sexta tanda (texto de la portada más arriba y más grande) y séptima (grilla nueva de fotos) subidas a `main`.
- [x] GitHub Pages activo: el sitio se abre en `leandro-couretot.github.io` (carpeta `casaminto-J-J`). Cada push a `main` se publica solo en 1-2 minutos.
- [ ] Definir dominio propio (opcional) para compartir con los invitados.
- [ ] Revisar metadatos para compartir por WhatsApp (`<title>`, descripción, imagen Open Graph).
