// ======================================================
// DETECCIÓN DE CONEXIÓN A INTERNET (ONLINE / OFFLINE)
// ======================================================
// Este script se encarga de:
// - Detectar si el usuario tiene conexión a internet
// - Mostrar u ocultar un mensaje visual cuando no hay red
// - Reaccionar dinámicamente a cambios de conexión
// ======================================================

window.addEventListener('load', function() {

    // --------------------------------------------------
    // REFERENCIA AL MENSAJE DE ESTADO OFFLINE
    // --------------------------------------------------
    // Elemento que se muestra cuando no hay conexión
    const offlineMsg = document.getElementById('offline-message');

    // --------------------------------------------------
    // FUNCIÓN PARA ACTUALIZAR EL ESTADO DE CONEXIÓN
    // --------------------------------------------------
    // Utiliza la API navigator.onLine para determinar
    // si el navegador tiene acceso a internet

    function updateOnlineStatus() {

        if (navigator.onLine) {
            // Si hay conexión, se oculta el mensaje offline
            offlineMsg.style.display = 'none';
        } else {
            // Si no hay conexión, se muestra el mensaje offline
            offlineMsg.style.display = 'flex';
        }
    }

    // --------------------------------------------------
    // ESCUCHA DE EVENTOS DE CONECTIVIDAD
    // --------------------------------------------------
    // Se activan automáticamente cuando el estado
    // de red del navegador cambia

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // --------------------------------------------------
    // EJECUCIÓN INICIAL
    // --------------------------------------------------
    // Permite detectar si la página se cargó
    // sin conexión desde el inicio

    updateOnlineStatus();

});
