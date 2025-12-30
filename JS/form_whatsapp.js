document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            // 1. Captura de datos
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const serviceInput = document.getElementById('service');
            const messageInput = document.getElementById('message');

            // --- SECCIÓN DE VALIDACIONES DINÁMICAS ---

            // A. Validar qué campo falta específicamente
            if (!nameInput.value.trim()) {
                alert("❌ Protocolo Incompleto: Por favor, ingrese su Nombre.");
                nameInput.focus(); // Pone el cursor en el campo faltante
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

            // B. Validar dominios de correo específicos
            const emailLower = emailInput.value.toLowerCase();
            const allowedDomains = ['@gmail.com', '@outlook.com', '@hotmail.com', '@icloud.com', '@yahoo.com'];
            const isDomainValid = allowedDomains.some(domain => emailLower.endsWith(domain));

            if (!isDomainValid) {
                alert("⚠️ Correo no admitido: Solo se permiten dominios oficiales (@gmail, @outlook, @hotmail, @yahoo).");
                emailInput.focus();
                return;
            }

            // C. Limpieza anti-inyección (Sanitización)
            const sanitize = (str) => str.replace(/[<>]/g, "").trim();
            const name = sanitize(nameInput.value);
            const email = sanitize(emailLower);
            
            // El mensaje sigue siendo opcional
            const message = messageInput.value.trim() ? sanitize(messageInput.value) : "Sin mensaje adicional";

            // --- FIN DE VALIDACIONES ---

            // Mapeo del valor del servicio
            let serviceText = "Sin especificar";
            if (serviceInput.value === "quinceaneras") {
                serviceText = "Quinceañera";
            } else if (serviceInput.value === "bodas") {
                serviceText = "Boda";
            } else if (serviceInput.value === "especiales") {
                serviceText = "Eventos Especiales";
            }

            // 2. Construcción del mensaje con Emojis
            let whatsappMessage = `¡Hola! 👋 Vengo de su sitio web *Corte Militar* y me gustaría solicitar una cotización. 📋\n\n` +
            `*Datos del Cliente:*\n` +
            `👤 *Nombre:* ${name}\n` +
            `📧 *Email:* ${email}\n` +
            `🎖️ *Servicio de Interés:* ${serviceText}\n\n` +
            `*Mensaje Adicional:*\n` +
            `💬 ${message}\n\n` +
            `Agradezco su pronta respuesta. 🫡`;

            // 3. Número de WhatsApp
            const phoneNumber = '573152510582'; 

            // 4. Redirección
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
});