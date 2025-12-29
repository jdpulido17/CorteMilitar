window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    // Damos un pequeño retraso de 900ms para que la animación se aprecie
    setTimeout(() => {
        preloader.classList.add('fade-out');
        // Eliminamos el elemento del DOM después de la transición
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 900);
        
    }, 1000); 
});