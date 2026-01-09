// ======================================================
// CARRUSEL DE IMÁGENES Y VIDEOS (AUTOMÁTICO + MANUAL)
// ======================================================
// Este script gestiona un carrusel horizontal que:
// - Soporta imágenes y videos en los slides
// - Avanza automáticamente
// - Reproduce videos completos antes de avanzar
// - Permite navegación manual (siguiente / anterior)
// - Se adapta al redimensionamiento de pantalla
// ======================================================

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------
    // 1. REFERENCIAS A ELEMENTOS DEL DOM
    // --------------------------------------------------

    // Todos los ítems (slides) del carrusel
    const items = document.querySelectorAll('.carousel-item'); 

    // Contenedor que se desplaza horizontalmente
    const track = document.getElementById('carousel-track');

    // Botones de navegación manual
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    // Seguridad: salir si el carrusel no existe en la página
    if (!track || items.length === 0 || !prevBtn || !nextBtn) {
        return;
    }

    // --------------------------------------------------
    // 2. ESTADO GLOBAL DEL CARRUSEL
    // --------------------------------------------------

    // Índice del slide actual
    let currentIndex = 0;
    
    // Tiempo de exhibición para imágenes (en milisegundos)
    const PHOTO_DISPLAY_TIME = 5000; 

    // Temporizador para controlar el auto-avance de imágenes
    let photoTimer; 

    // --------------------------------------------------
    // 3. FUNCIÓN PARA AVANZAR AL SIGUIENTE SLIDE
    // --------------------------------------------------
    // Incrementa el índice y vuelve al inicio si llega al final

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    };

    // --------------------------------------------------
    // 4. FUNCIÓN PRINCIPAL DE ACTUALIZACIÓN DEL CARRUSEL
    // --------------------------------------------------
    // Se encarga de:
    // - Mover el track
    // - Detener temporizadores anteriores
    // - Gestionar videos e imágenes
    // - Controlar el auto-avance

    const updateCarousel = () => {

        // Limpia cualquier temporizador activo
        clearTimeout(photoTimer);
        
        // Calcula el ancho real del slide (importante para responsive)
        const itemWidth = items[0].clientWidth; 

        // Calcula el desplazamiento horizontal
        const offset = -currentIndex * itemWidth;

        // Aplica la transformación CSS
        track.style.transform = `translateX(${offset}px)`;

        // --------------------------------------------------
        // Reinicia TODOS los videos del carrusel
        // --------------------------------------------------
        // Esto evita:
        // - Videos reproduciéndose en segundo plano
        // - Eventos duplicados

        items.forEach(item => {
            const video = item.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
                video.removeEventListener('ended', nextSlide);
            }
        });

        // --------------------------------------------------
        // Manejo del contenido del slide actual
        // --------------------------------------------------

        const currentItem = items[currentIndex];
        const currentVideo = currentItem.querySelector('video');

        if (currentVideo) {
            // Caso: SLIDE CON VIDEO
            // - Reproduce el video
            // - Avanza automáticamente al finalizar
            currentVideo.addEventListener('ended', nextSlide);
            currentVideo.play();
        } else {
            // Caso: SLIDE CON IMAGEN
            // - Avanza después del tiempo definido
            photoTimer = setTimeout(nextSlide, PHOTO_DISPLAY_TIME);
        }
    };
    
    // --------------------------------------------------
    // 5. EVENTOS DE NAVEGACIÓN MANUAL
    // --------------------------------------------------

    // Botón "Siguiente"
    nextBtn.addEventListener('click', () => {
        clearTimeout(photoTimer); // Detiene auto-avance por interacción
        nextSlide();
    });
    
    // Botón "Anterior"
    prevBtn.addEventListener('click', () => {
        clearTimeout(photoTimer); // Detiene auto-avance por interacción
        currentIndex = (currentIndex > 0)
            ? currentIndex - 1
            : items.length - 1; // Vuelve al último slide
        updateCarousel();
    });

    // --------------------------------------------------
    // 6. AJUSTE RESPONSIVE
    // --------------------------------------------------
    // Recalcula posiciones si cambia el tamaño de la pantalla

    window.addEventListener('resize', updateCarousel); 

    // --------------------------------------------------
    // 7. INICIALIZACIÓN DEL CARRUSEL
    // --------------------------------------------------

    updateCarousel(); 

});
