// === EFECTOS DE SCROLL (FADE-IN) ===

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los elementos con la clase 'fade-in'
    const fadeElements = document.querySelectorAll('.fade-in');

    // Crea un Intersection Observer para detectar cuando un elemento entra en el viewport
    const observerOptions = {
        root: null, // usa el viewport como root
        rootMargin: '0px',
        threshold: 0.1 // 10% del elemento debe ser visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible, añade la clase 'visible' para activar la transición CSS
                entry.target.classList.add('visible');
                // Deja de observar el elemento una vez que se ha hecho visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa cada elemento 'fade-in'
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // === MENÚ HAMBURGUESA (Móvil) ===
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuBtn && navMenu) {
        // Alterna la clase 'active' para mostrar/ocultar el menú móvil
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Cierra el menú móvil al hacer clic en un enlace (muy importante en la página única)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Solo si el menú está activo (visible en móvil), lo oculta
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

});

