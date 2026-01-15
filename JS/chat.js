/* =========================================================
   CHATBOT DE PROTOCOLO MILITAR – CORTE MILITAR
   ---------------------------------------------------------
   Este script controla el comportamiento completo del
   asistente virtual:
   - Apertura y cierre del chat
   - Navegación por menús
   - Selección de eventos y servicios
   - Agendamiento de fecha y hora
   - Envío automático del resumen a WhatsApp
   ---------------------------------------------------------
   IMPORTANTE:
   ❗ No modificar la lógica sin pruebas previas
   ❗ Los estilos de fecha y hora son intencionales
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {

    // ===============================
    // REFERENCIAS AL DOM
    // ===============================
    const chatBox = document.getElementById('chat-box');
    const chatOpenBtn = document.getElementById('chat-open-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatBody = document.getElementById('chat-body');

    /* ==========================================
       OBJETO DE ESTADO DEL USUARIO
       ------------------------------------------
       Guarda las selecciones realizadas por
       el usuario durante la conversación.
       Se usa para construir el mensaje final
       de WhatsApp.
       ========================================== */
    let seleccionUsuario = {
        evento: "No especificado",
        servicio: "Consulta General",
        detalle: "Interés en protocolo militar"
    };

    // Validación básica: si falta algún elemento crítico, se detiene el script
    if (!chatBox || !chatOpenBtn || !chatBody) return;

    // ===============================
    // FUNCIÓN: ABRIR CHAT
    // ===============================
    function openChat() {
        chatBox.classList.remove('chat-closed');
        chatOpenBtn.style.display = 'none';
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // ===============================
    // FUNCIÓN: CERRAR CHAT
    // - Limpia el contenido
    // - Reinicia el menú principal
    // ===============================
    function closeChat() {
        chatBox.classList.add('chat-closed');
        chatOpenBtn.style.display = 'flex';
        chatBody.innerHTML = '';
        generateResponse('main_menu');
    }

    /* ======================================================
       ESTRUCTURA DE RESPUESTAS DEL BOT
       ------------------------------------------------------
       Cada clave representa un estado del chat.
       message : texto que muestra el bot
       options : botones interactivos
       calendar: muestra selector de fecha/hora
       contact : genera botón de envío a WhatsApp
       ====================================================== */
    const responses = {

        main_menu: {
            message: "👋 ¡Hola! Soy tu Asistente Militar. ¿En qué puedo ayudarte?",
            options: [
                { text: "🪖 Hablar con un Asesor Ahora", response: "escribir_asesor" },
                { text: "💲 Precios y Cotizaciones", response: "precios" },
                { text: "🎖️ Tipos de Servicio", response: "servicios" },
                { text: "⏱️ Disponibilidad Inmediata", response: "agendar_cita" },
                { text: "⭐ Servicios Más Solicitados", response: "servicios" }
            ]
        },

        precios: {
            message: "💲 ¿Para qué tipo de evento deseas cotizar?",
            options: [
                { text: "💍 Boda", response: "menu_bodas" },
                { text: "👑 Quinceañera", response: "menu_xv" },
                { text: "🔙 Menú Principal", response: "main_menu" }
            ]
        },

        menu_bodas: {
            message: "💍 **Servicios para Bodas Militares**",
            options: [
                { text: "⚔️ Cruce de Sables", response: "info_sables" },
                { text: "🏅 Calle de Honor", response: "info_calle_honor" },
                { text: "🎼 Vals Militar", response: "info_vals" },
                { text: "🔙 Precios y Cotizaciones", response: "precios" }
            ]
        },

        menu_xv: {
            message: "👑 **Servicios para Quinceañeras Militares**",
            options: [
                { text: "⚔️ Cruce de Sables", response: "info_sables" },
                { text: "🏅 Calle de Honor", response: "info_calle_honor" },
                { text: "🎼 Vals Militar", response: "info_vals" },
                { text: "🔙 Precios y Cotizaciones", response: "precios" }
            ]
        },

        servicios: {
            message: "🎖️ **Nuestros Servicios de Protocolo Militar**",
            options: [
                { text: "⚔️ Cruce de Sables", response: "info_sables" },
                { text: "🏅 Calle de Honor", response: "info_calle_honor" },
                { text: "💂‍♂️ Escolta Militar", response: "info_escolta" },
                { text: "🛡️ Guardia de Honor", response: "info_guardia" },
                { text: "🎼 Vals Militar", response: "info_vals" },
                { text: "⚰️ Protocolo Fúnebre", response: "info_funebre" },
                { text: "🔙 Menú Principal", response: "main_menu" }
            ]
        },

        /* ======================================================
           BLOQUES DE INFORMACIÓN DE SERVICIOS
           ------------------------------------------------------
           Cada uno permite consultar disponibilidad
           ====================================================== */
        info_sables: {
            message: "⚔️ El **Cruce de Sables** simboliza honor y respeto.",
            options: [
                { text: "🗓️ Consultar Fecha", response: "agendar_cita" },
                { text: "🔙 Tipos de Servicio", response: "servicios" }
            ]
        },

        info_calle_honor: {
            message: "🏅 La **Calle de Honor** es una formación ceremonial solemne.",
            options: [
                { text: "🗓️ Consultar Fecha", response: "agendar_cita" },
                { text: "🔙 Tipos de Servicio", response: "servicios" }
            ]
        },

        info_escolta: {
            message: "💂‍♂️ La **Escolta Militar** acompaña actos protocolarios.",
            options: [
                { text: "🗓️ Consultar Fecha", response: "agendar_cita" },
                { text: "🔙 Tipos de Servicio", response: "servicios" }
            ]
        },

        info_guardia: {
            message: "🛡️ La **Guardia de Honor** representa solemnidad.",
            options: [
                { text: "🗓️ Consultar Fecha", response: "agendar_cita" },
                { text: "🔙 Tipos de Servicio", response: "servicios" }
            ]
        },

        info_vals: {
            message: "🎼 El **Vals Militar** combina disciplina y elegancia.",
            options: [
                { text: "🗓️ Consultar Fecha", response: "agendar_cita" },
                { text: "🔙 Tipos de Servicio", response: "servicios" }
            ]
        },

        info_funebre: {
            message: "⚰️ Protocolo Fúnebre Militar.",
            options: [
                { text: "🗓️ Consultar Fecha", response: "agendar_cita" },
                { text: "🔙 Tipos de Servicio", response: "servicios" }
            ]
        },

        // Selector de fecha y hora
        agendar_cita: {
            message: "🗓️ **Protocolo de Disponibilidad**: Indique fecha y hora:",
            calendar: true
        },

        // Confirmación y envío a WhatsApp
        confirmar_envio: {
            message: "✅ **Resumen de Solicitud Listo**👇🏻.",
            contact: true
        }
    };

    /* ======================================================
       FUNCIÓN PRINCIPAL DEL BOT
       ------------------------------------------------------
       Genera respuestas, botones, calendario y WhatsApp
       ====================================================== */
    function generateResponse(key) {

        // Redirección directa a asesor humano
        if (key === 'escribir_asesor') {
            window.open(
                "https://api.whatsapp.com/send?phone=573152510582&text=" +
                encodeURIComponent("Hola, necesito comunicarme con un asesor militar 🫡"),
                "_blank"
            );
            closeChat();
            return;
        }

        const data = responses[key];
        if (!data) return;

        // Indicador visual de "Escribiendo..."
        const typing = document.createElement('p');
        typing.className = 'bot-message';
        typing.innerHTML = "<i>Escribiendo...</i>";
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {

            typing.remove();

            const group = document.createElement('div');
            group.className = 'message-group';

            // Mensaje del bot
            const botMsg = document.createElement('p');
            botMsg.className = 'bot-message';
            botMsg.innerHTML = data.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            group.appendChild(botMsg);

            /* ===============================
               CALENDARIO DE FECHA Y HORA
               =============================== */
            if (data.calendar) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const minDate = tomorrow.toISOString().split('T')[0];

                const calendarBox = document.createElement('div');
                calendarBox.style.cssText =
                    "background:#1a1a1a; padding:12px; border-radius:8px; border:1px solid #c5a448; margin-top:10px;";
                calendarBox.innerHTML = `
                    <label style="color:#c5a448; font-size:0.75rem;">Fecha:</label>
                    <input type="date" id="chat-date" min="${minDate}" style="width:100%; margin-bottom:8px; padding:5px; background:#000; color:#fff; border:1px solid #444;">
                    <label style="color:#c5a448; font-size:0.75rem;">Hora:</label>
                    <input type="time" id="chat-time" style="width:100%; margin-bottom:12px; padding:5px; background:#000; color:#fff; border:1px solid #444;">
                    <button class="chat-option" id="btn-validar-fecha"
                        style="background:#c5a448; color:black; width:100%; border:none; padding:10px; font-weight:bold;">
                        CONFIRMAR DATOS
                    </button>
                `;
                group.appendChild(calendarBox);
            }

            /* ===============================
               ENVÍO A WHATSAPP
               =============================== */
            if (data.contact) {
                const waMsg = encodeURIComponent(
                    `¡Hola! 👋 Vengo de su sitio web Corte Militar.\n\n` +
                    `🎉 Evento: ${seleccionUsuario.evento}\n` +
                    `🎖️ Servicio: ${seleccionUsuario.servicio}\n` +
                    `📌 Detalle: ${seleccionUsuario.detalle}\n` +
                    `📅 Fecha: ${document.getElementById('chat-date')?.value}\n` +
                    `⏰ Hora: ${document.getElementById('chat-time')?.value}\n\n` +
                    `¿Tienen disponibilidad? 🫡`
                );

                const btn = document.createElement('a');
                btn.href = `https://api.whatsapp.com/send?phone=573152510582&text=${waMsg}`;
                btn.target = "_blank";
                btn.textContent = "🟢 ENVIAR POR WHATSAPP";
                btn.style.cssText =
                    "background:#25D366; color:white; display:block; text-align:center; padding:12px; border-radius:5px; text-decoration:none; margin:15px auto; font-weight:bold;";

                // Cierra el chat automáticamente después de enviar
                btn.addEventListener('click', () => {
                    setTimeout(() => closeChat(), 300);
                });

                group.appendChild(btn);
            }

            // Botones de navegación
            if (data.options) {
                data.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'chat-option';
                    btn.textContent = opt.text;
                    btn.dataset.response = opt.response;
                    group.appendChild(btn);
                });
            }

            chatBody.appendChild(group);
            chatBody.scrollTop = chatBody.scrollHeight;

        }, 900);
    }

    /* ======================================================
       EVENTOS DE INTERACCIÓN DEL USUARIO
       ====================================================== */
    chatBody.addEventListener('click', function(e) {

        // Confirmación de fecha y hora
        if (e.target.id === 'btn-validar-fecha') {
            generateResponse('confirmar_envio');
            return;
        }

        if (!e.target.classList.contains('chat-option')) return;

        const key = e.target.dataset.response;
        const text = e.target.textContent;

        // Asignación del tipo de evento
        if (key === 'menu_bodas') seleccionUsuario.evento = "Boda";
        if (key === 'menu_xv') seleccionUsuario.evento = "Quinceañera";
        if (key === 'servicios') seleccionUsuario.evento = "No especificado";

        // Asignación del servicio seleccionado
        if (key.startsWith('info_')) {
            seleccionUsuario.servicio = text;
            seleccionUsuario.detalle = text;
        }

        generateResponse(key);
    });

    // Eventos de apertura y cierre del chat
    chatOpenBtn.addEventListener('click', openChat);
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', closeChat);

    // Inicio automático del bot
    generateResponse('main_menu');
});
