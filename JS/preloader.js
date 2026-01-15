// ======================================================
// PRELOADER CON TRANSICIÓN DE SALIDA (FADE-OUT)
// ======================================================
// Este script controla:
// - La visualización inicial del preloader
// - Un retraso intencional para apreciar la animación
// - La animación de salida mediante clase CSS
// - La eliminación visual del preloader del DOM
// ======================================================

window.addEventListener('load', function() {

    // --------------------------------------------------
    // REFERENCIA AL ELEMENTO PRELOADER
    // --------------------------------------------------
    // Elemento que se muestra mientras la página carga
    const preloader = document.getElementById('preloader');

    // --------------------------------------------------
    // RETRASO INICIAL
    // --------------------------------------------------
    // Se espera 1000 ms antes de iniciar la animación
    // para asegurar que el preloader sea visible

    setTimeout(() => {

        // ----------------------------------------------
        // INICIO DE LA TRANSICIÓN DE SALIDA
        // ----------------------------------------------
        // Se añade una clase CSS que debe contener
        // la animación de desvanecimiento (fade-out)
        preloader.classList.add('fade-out');

        // ----------------------------------------------
        // OCULTAR EL PRELOADER TRAS LA ANIMACIÓN
        // ----------------------------------------------
        // Se espera el tiempo de la transición (900 ms)
        // antes de ocultar completamente el elemento

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 900);

    }, 1000);

});
