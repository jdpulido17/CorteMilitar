// ======================================================
// FORMULARIO DE CONTACTO → ENVÍO A WHATSAPP
// ======================================================
// Este script se encarga de:
// 1. Validar dinámicamente los campos del formulario.
// 2. Proteger contra datos vacíos y dominios no permitidos.
// 3. Sanitizar entradas para evitar inyección básica.
// 4. Construir un mensaje profesional con emojis.
// 5. Redirigir al usuario a WhatsApp con el mensaje listo.
// ======================================================

document.addEventListener('DOMContentLoaded', () => {

    // Obtiene el formulario de contacto por su ID
    const contactForm = document.getElementById('contactForm');
    
    // Verifica que el formulario exista antes de operar
    if (contactForm) {

        // Escucha el evento de envío del formulario
        contactForm.addEventListener('submit', function(event) {

            // Evita el envío tradicional del formulario (recarga de página)
            event.preventDefault(); 

            // --------------------------------------------------
            // 1. CAPTURA DE DATOS DEL FORMULARIO
            // --------------------------------------------------

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const serviceInput = document.getElementById('service');
            const messageInput = document.getElementById('message');

            // --------------------------------------------------
            // 2. VALIDACIONES DINÁMICAS DEL FORMULARIO
            // --------------------------------------------------

            // A. Validación de campos obligatorios con mensajes específicos

            if (!nameInput.value.trim()) {
                alert("❌ Protocolo Incompleto: Por favor, ingrese su Nombre.");
                nameInput.focus(); // Coloca el cursor en el campo faltante
                return;
            }

            if (!emailInput.value.trim()) {
                alert("❌ Protocolo Incompleto: Por favor, ingrese su Email.");
                emailInput.focus();
                return;
            }

            if (!serviceInput.value) {
                alert("❌ Protocolo Incompleto: Por favor, seleccione un Servicio.");
                serviceInput.focus();
                return;
            }

            // B. Validación de dominios de correo permitidos
            // (Control básico para evitar correos inválidos o corporativos no deseados)

            const emailLower = emailInput.value.toLowerCase();
            const allowedDomains = [
                '@gmail.com',
                '@outlook.com',
                '@hotmail.com',
                '@icloud.com',
                '@yahoo.com'
            ];

            const isDomainValid = allowedDomains.some(domain =>
                emailLower.endsWith(domain)
            );

            if (!isDomainValid) {
                alert("⚠️ Correo no admitido: Solo se permiten dominios oficiales (@gmail, @outlook, @hotmail, @yahoo).");
                emailInput.focus();
                return;
            }

            // C. Sanitización básica de entradas
            // Elimina caracteres potencialmente peligrosos (< >)
            // y limpia espacios innecesarios

            const sanitize = (str) => str.replace(/[<>]/g, "").trim();

            const name = sanitize(nameInput.value);
            const email = sanitize(emailLower);

            // El mensaje es opcional; si no existe, se asigna un texto por defecto
            const message = messageInput.value.trim()
                ? sanitize(messageInput.value)
                : "Sin mensaje adicional";

            // --------------------------------------------------
            // 3. MAPEO DEL SERVICIO SELECCIONADO
            // --------------------------------------------------

            // Traduce el valor interno del select a un texto legible
            let serviceText = "Sin especificar";

            if (serviceInput.value === "quinceaneras") {
                serviceText = "Quinceañera";
            } else if (serviceInput.value === "bodas") {
                serviceText = "Boda";
            } else if (serviceInput.value === "especiales") {
                serviceText = "Eventos Especiales";
            }

            // --------------------------------------------------
            // 4. CONSTRUCCIÓN DEL MENSAJE PARA WHATSAPP
            // --------------------------------------------------

            // Mensaje estructurado con emojis y formato legible
            let whatsappMessage =
                `¡Hola! 👋 Vengo de su sitio web *Corte Militar* y me gustaría solicitar una cotización. 📋\n\n` +
                `*Datos del Cliente:*\n` +
                `👤 *Nombre:* ${name}\n` +
                `📧 *Email:* ${email}\n` +
                `🎖️ *Servicio de Interés:* ${serviceText}\n\n` +
                `*Mensaje Adicional:*\n` +
                `💬 ${message}\n\n` +
                `Agradezco su pronta respuesta. 🫡`;

            // --------------------------------------------------
            // 5. CONFIGURACIÓN Y REDIRECCIÓN A WHATSAPP
            // --------------------------------------------------

            // Número de WhatsApp de destino (formato internacional)
            const phoneNumber = '573152510582'; 

            // Codifica el mensaje para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Construye la URL de WhatsApp
            const whatsappUrl =
                `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
            
            // Abre WhatsApp en una nueva pestaña
            window.open(whatsappUrl, '_blank');
        });
    }
});
