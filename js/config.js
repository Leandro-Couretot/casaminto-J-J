/*
 * CONFIGURACIÓN DE LA INVITACIÓN
 * Todo lo que hay que completar o cambiar está acá.
 * Los valores con "TODO" son placeholders pendientes (ver CLAUDE.md).
 */
window.CONFIG = {
  links: {
    comoLlegar: 'https://maps.app.goo.gl/7nqbSM78iBb2CJMZ8',   // Google Maps de La Posada Multiespacio
    hospedaje:  'https://share.google/w9Xt6810jJyRvWxru',   // Wyndham Nordelta Tigre (ficha de Google)
    rsvp:       'https://forms.gle/KqwRxe1uDaNRY1QT9',   // formulario de confirmación de asistencia (Google Forms)
    calendar:   'https://calendar.app.google/7iSG6mEJRQ4w4dVJ9',   // "Agregar a Google Calendar"
    playlist:   'https://open.spotify.com/playlist/7LvauM5IuMQl19EpjGZUE7?si=sobf58oJTc2ksEpg3BqFqA&utm_source=copy-link&pi=E4hCHuDSRIWr1&pt=dd5b2062455679eb254d8d13bc79d1b3',   // link de invitación a colaborar (el reproductor usa solo el ID)
    alquilerWeb:'https://www.waycarrental.com/'
  },

  // Contacto de traslados: Kavaci Travel (desde CABA o desde el Wyndham Nordelta)
  kavaci: {
    whatsapp: '5491167807979',              // sin + ni espacios (para wa.me)
    telefono: '+54 9 11 6780-7979',         // como se muestra
    correo: 'kavacitravelsrl@gmail.com',
    instagram: 'kavaci_travel'              // sin @
  },

  alquilerAuto: {
    nombre: 'Waycar Rental',
    codigo: 'JULIYJOACO',
    detalle: '30% de descuento. Válido para reservas creadas entre el 28/11/2026 y el 14/12/2026 en sucursal de Buenos Aires.'
  },

  musica: {
    videoId: 'rbaoKL1Ei0c',                 // YouTube (prueba). Dejar '' para desactivar la música
    volumen: 55,                            // 0-100
    inicio: 0                               // segundo desde el que arranca
  },

  banco: {
    cuentas: [
      { titulo: 'Cuenta en pesos', alias: 'JULIYJOACO.2026', cbu: '4530000800018690050058' },
      { titulo: 'Cuenta en USD',   alias: 'JULIYJOA.2026',   cbu: '4530000800026563727392' }
    ]
  }
};
