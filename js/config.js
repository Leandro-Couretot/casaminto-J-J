/*
 * CONFIGURACIÓN DE LA INVITACIÓN
 * Todo lo que hay que completar o cambiar está acá.
 * Los valores con "TODO" son placeholders pendientes (ver CLAUDE.md).
 */
window.CONFIG = {
  links: {
    comoLlegar: 'https://maps.app.goo.gl/7nqbSM78iBb2CJMZ8',   // Google Maps de La Posada Multiespacio
    hospedaje:  'https://share.google/w9Xt6810jJyRvWxru',   // Wyndham Nordelta Tigre (ficha de Google)
    traslado:   'https://www.google.com',   // TODO: contacto Cavaci Travel (WhatsApp / web)
    rsvp:       'https://forms.gle/KqwRxe1uDaNRY1QT9',   // formulario de confirmación de asistencia (Google Forms)
    calendar:   'https://www.google.com',   // TODO: link "Agregar a Google Calendar"
    playlist:   'https://open.spotify.com/playlist/7LvauM5IuMQl19EpjGZUE7',
    alquilerWeb:'https://www.waycarrental.com/'
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
