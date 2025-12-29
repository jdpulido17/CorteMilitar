document.addEventListener('DOMContentLoaded', () => {
    // Usamos querySelectorAll para obtener los ítems
    const items = document.querySelectorAll('.carousel-item'); 
    const track = document.getElementById('carousel-track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    // Salir si no estamos en una página con la galería
    if (!track || items.length === 0 || !prevBtn || !nextBtn) {
        return;
    }

    let currentIndex = 0;
    
    // TIEMPO DE EXHIBICIÓN para imágenes estáticas (5 segundos)
    const PHOTO_DISPLAY_TIME = 5000; 
    let photoTimer; 

    // --- FUNCIÓN DE AVANCE AL SIGUIENTE SLIDE ---
    const nextSlide = () => {
        // La lógica de avance: si llega al final, vuelve a 0
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    };

    // --- FUNCIÓN PRINCIPAL DE ACTUALIZACIÓN ---
    const updateCarousel = () => {
        // 1. Limpieza inicial: Detener temporizador y videos anteriores
        clearTimeout(photoTimer);
        
        // La variable itemWidth debe calcularse DENTRO de updateCarousel si se usa window.resize
        const itemWidth = items[0].clientWidth; 
        const offset = -currentIndex * itemWidth;
        track.style.transform = `translateX(${offset}px)`;

        // Detener y resetear todos los videos, y remover listeners previos
        items.forEach(item => {
            const video = item.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
                // Remover listener para evitar que se ejecute más de una vez
                video.removeEventListener('ended', nextSlide); 
            }
        });

        // 2. Manejo de contenido del Slide Actual
        const currentItem = items[currentIndex];
        const currentVideo = currentItem.querySelector('video');

        if (currentVideo) {
            // Caso VIDEO: Reproducir y escuchar el evento 'ended'
            currentVideo.addEventListener('ended', nextSlide);
            currentVideo.play();
        } else {
            // Caso IMAGEN: Establecer un temporizador para el avance
            photoTimer = setTimeout(nextSlide, PHOTO_DISPLAY_TIME);
        }
    };
    
    // --- MANEJO DE EVENTOS (BOTONES) ---
    // Avance manual con el botón "Siguiente"
    nextBtn.addEventListener('click', () => {
        clearTimeout(photoTimer); // Detiene el auto-avance si el usuario interactúa
        nextSlide();
    });
    
    // Retroceso manual con el botón "Anterior"
    prevBtn.addEventListener('click', () => {
        clearTimeout(photoTimer); // Detiene el auto-avance si el usuario interactúa
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        updateCarousel();
    });

    // Ajuste por redimensionamiento
    window.addEventListener('resize', updateCarousel); 

    // Ejecuta al cargar para establecer la posición inicial
    updateCarousel(); 
});