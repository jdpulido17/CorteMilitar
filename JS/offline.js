window.addEventListener('load', function() {
    const offlineMsg = document.getElementById('offline-message');

    function updateOnlineStatus() {
        if (navigator.onLine) {
            offlineMsg.style.display = 'none'; // Hay internet, ocultar
        } else {
            offlineMsg.style.display = 'flex'; // No hay internet, mostrar
        }
    }

    // Escuchar cambios de red
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Ejecutar al cargar por si ya inicia sin internet
    updateOnlineStatus();
});