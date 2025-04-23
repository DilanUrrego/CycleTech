document.addEventListener('DOMContentLoaded', function() {
  const listaNotificaciones = document.getElementById('lista-notificaciones');
  const btnMarcarTodas = document.getElementById('marcar-todas');
  const btnEliminarTodas = document.getElementById('eliminar-todas');

  // Datos de ejemplo mejorados
  const notificaciones = [
      {
          id: 1,
          icono: '🚲',
          titulo: 'Bicicleta desanclada',
          descripcion: 'Iniciaste tu recorrido con la bicicleta #104 en la estación Plaza Central.',
          fecha: 'Hoy - 9:42am',
          leida: false
      },
      {
          id: 2,
          icono: '✅',
          titulo: 'Bicicleta entregada correctamente',
          descripcion: '¡Gracias! Entregaste la bicicleta #104 en la estación Parque Norte sin novedades.',
          fecha: 'Hoy - 10:18am',
          leida: false
      },
      {
          id: 3,
          icono: '⭐',
          titulo: '¡Ganaste puntos!',
          descripcion: '+15 puntos por devolver la bicicleta en una estación ideal. Tu saldo actual es de 235 puntos.',
          fecha: 'Ayer - 6:12pm',
          leida: true
      },
      {
          id: 4,
          icono: '📅',
          titulo: 'Reserva confirmada',
          descripcion: 'Tu bicicleta ha sido reservada en Plaza Central por 15 minutos. ¡No olvides retirarla!',
          fecha: '15 abr - 2:35pm',
          leida: true
      }
  ];

  // Renderizar notificaciones
  function renderizarNotificaciones() {
      if (notificaciones.length === 0) {
          listaNotificaciones.innerHTML = `
              <div class="notificaciones-vacio">
                  <i class="far fa-bell-slash"></i>
                  <h3>No tienes notificaciones</h3>
                  <p>Cuando tengas nuevas notificaciones, aparecerán aquí.</p>
              </div>
          `;
          return;
      }
      
      listaNotificaciones.innerHTML = '';
      
      notificaciones.forEach(notificacion => {
          const notificacionElement = document.createElement('div');
          notificacionElement.className = `notificacion ${notificacion.leida ? '' : 'no-leida'}`;
          
          notificacionElement.innerHTML = `
              <div class="notificacion-icono">${notificacion.icono}</div>
              <div class="notificacion-contenido">
                  <h3 class="notificacion-titulo">${notificacion.titulo}</h3>
                  <p class="notificacion-descripcion">${notificacion.descripcion}</p>
                  <span class="notificacion-fecha">${notificacion.fecha}</span>
              </div>
              <div class="notificacion-acciones">
                  ${notificacion.leida ? '' : `
                  <button class="btn-notificacion marcar" data-id="${notificacion.id}">
                      <i class="fas fa-check"></i> <span class="texto-boton">Marcar</span>
                  </button>`}
                  <button class="btn-notificacion eliminar" data-id="${notificacion.id}">
                      <i class="fas fa-trash-alt"></i> <span class="texto-boton">Eliminar</span>
                  </button>
              </div>
          `;
          
          listaNotificaciones.appendChild(notificacionElement);
      });

      agregarEventosNotificaciones();
  }

  function agregarEventosNotificaciones() {
      document.querySelectorAll('.btn-notificacion.marcar').forEach(btn => {
          btn.addEventListener('click', function() {
              const id = parseInt(this.getAttribute('data-id'));
              marcarComoLeida(id);
          });
      });

      document.querySelectorAll('.btn-notificacion.eliminar').forEach(btn => {
          btn.addEventListener('click', function() {
              const id = parseInt(this.getAttribute('data-id'));
              eliminarNotificacion(id);
          });
      });
  }

  function marcarComoLeida(id) {
      const index = notificaciones.findIndex(n => n.id === id);
      if (index !== -1) {
          notificaciones[index].leida = true;
          renderizarNotificaciones();
          mostrarFeedback('Notificación marcada como leída');
      }
  }

  function eliminarNotificacion(id) {
      const index = notificaciones.findIndex(n => n.id === id);
      if (index !== -1) {
          const notifEliminada = notificaciones.splice(index, 1)[0];
          renderizarNotificaciones();
          mostrarFeedback(`Notificación "${notifEliminada.titulo}" eliminada`);
      }
  }

  function mostrarFeedback(mensaje) {
      const feedback = document.createElement('div');
      feedback.className = 'feedback-notificacion';
      feedback.textContent = mensaje;
      document.body.appendChild(feedback);
      
      setTimeout(() => {
          feedback.classList.add('mostrar');
      }, 10);
      
      setTimeout(() => {
          feedback.classList.remove('mostrar');
          setTimeout(() => {
              feedback.remove();
          }, 300);
      }, 3000);
  }

  btnMarcarTodas.addEventListener('click', function() {
      if (notificaciones.some(n => !n.leida)) {
          notificaciones.forEach(notificacion => {
              notificacion.leida = true;
          });
          renderizarNotificaciones();
          mostrarFeedback('Todas las notificaciones marcadas como leídas');
      } else {
          mostrarFeedback('No hay notificaciones sin leer');
      }
  });

  btnEliminarTodas.addEventListener('click', function() {
      if (notificaciones.length > 0) {
          if (confirm('¿Estás seguro de que quieres eliminar todas las notificaciones?')) {
              notificaciones.length = 0;
              renderizarNotificaciones();
              mostrarFeedback('Todas las notificaciones eliminadas');
          }
      } else {
          mostrarFeedback('No hay notificaciones para eliminar');
      }
  });

  // Inicializar
  renderizarNotificaciones();
});