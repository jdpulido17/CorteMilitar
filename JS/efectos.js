// ======================================================
// EFECTOS DE SCROLL (FADE-IN) + MENÚ HAMBURGUESA MÓVIL
// ======================================================
// Este script se encarga de:
// 1. Aplicar animaciones "fade-in" cuando los elementos
//    entran en el viewport (scroll).
// 2. Controlar el menú hamburguesa en dispositivos móviles.
// ======================================================

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------
    // SECCIÓN 1: EFECTOS DE SCROLL (FADE-IN)
    // --------------------------------------------------

    // Selecciona todos los elementos que deben animarse
    // al hacer scroll (requieren la clase CSS 'fade-in')
    const fadeElements = document.querySelectorAll('.fade-in');

    // Configuración del Intersection Observer
    const observerOptions = {
        root: null,           // Usa el viewport del navegador
        rootMargin: '0px',    // Sin margen adicional
        threshold: 0.1        // El 10% del elemento debe ser visible
    };

    // Crea el observador para detectar cuándo los elementos
    // entran en el área visible del usuario
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            // Verifica si el elemento está visible en el viewport
            if (entry.isIntersecting) {

                // Agrega la clase 'visible' para activar
                // la transición definida en CSS
                entry.target.classList.add('visible');

                // Deja de observar el elemento para evitar
                // ejecuciones repetidas y mejorar rendimiento
                observer.unobserve(entry.target);
            }
        });

    }, observerOptions);

    // Inicia la observación de cada elemento con fade-in
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --------------------------------------------------
    // SECCIÓN 2: MENÚ HAMBURGUESA (VERSIÓN MÓVIL)
    // --------------------------------------------------

    // Botón del menú hamburguesa
    const menuBtn = document.getElementById('menu-btn');

    // Contenedor del menú de navegación
    const navMenu = document.getElementById('nav-menu');

    // Enlaces del menú (usados para cerrar el menú al navegar)
    const navLinks = document.querySelectorAll('.nav-link');

    // Validación básica para evitar errores si no existen los elementos
    if (menuBtn && navMenu) {

        // Evento para abrir o cerrar el menú móvil
        menuBtn.addEventListener('click', () => {

            // Alterna la clase 'active' para mostrar u ocultar el menú
            navMenu.classList.toggle('active');
        });

        // Evento para cerrar el menú al hacer clic en un enlace
        // Muy importante en sitios de una sola página (SPA o landing)
        navLinks.forEach(link => {

            link.addEventListener('click', () => {

                // Solo cierra el menú si está activo (modo móvil)
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

});
