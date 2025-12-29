document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const chatOpenBtn = document.getElementById('chat-open-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn'); 
    const chatBody = document.getElementById('chat-body');

    let seleccionUsuario = {
        servicio: "Consulta General",
        detalle: "Interés en protocolo militar"
    };

    if (!chatBox || !chatOpenBtn || !chatBody) return;

    // --- MEJORA: NOTIFICACIÓN INICIAL (HINT) ---
    setTimeout(() => {
        if (chatBox.classList.contains('chat-closed')) {
            const hint = document.createElement('div');
            hint.className = 'chat-hint'; // Asegúrate de agregar el CSS que te pasé antes
            hint.style.cssText = "position:fixed; bottom:95px; right:25px; background:#c5a448; color:black; padding:10px 15px; border-radius:15px 15px 5px 15px; font-size:0.85rem; font-weight:bold; box-shadow:0 4px 15px rgba(0,0,0,0.3); z-index:9999; animation: fadeIn 0.5s;";
            hint.innerText = "¡Hola! ¿Buscas un protocolo de gala? ⚔️";
            document.body.appendChild(hint);
            
            chatOpenBtn.addEventListener('click', () => hint.remove());
            setTimeout(() => { if(hint) hint.remove(); }, 8000);
        }
    }, 4000);

    function openChat() {
        chatBox.classList.remove('chat-closed');
        chatOpenBtn.style.display = 'none'; 
        chatBody.scrollTop = chatBody.scrollHeight; 
    }

    function closeChat() {
        chatBox.classList.add('chat-closed');
        chatOpenBtn.style.display = 'flex';
        chatBody.innerHTML = ''; 
        generateResponse('main_menu'); 
    }

    const responses = {
        'main_menu': {
            message: "👋 ¡Hola! Soy tu Asistente Militar. ¿En qué puedo ayudarte?",
            options: [
                { text: "👤 Comunicarme con un Asesor", response: "escribir_asesor" },
                { text: "💲 Precios y Cotizaciones", response: "precios" },
                { text: "🎖️ Tipos de Servicio", response: "servicios" },
                { text: "🗓️ Ver Disponibilidad", response: "agendar_cita" }
            ]
        },
        'precios': {
            message: "💲 Los precios varían según el evento. ¿Qué estás organizando?",
            options: [
                { text: "💍 Boda", response: "menu_bodas" },
                { text: "👑 Quinceañera", response: "menu_xv" },
                { text: "🔙 Menú Principal", response: "main_menu" }
            ]
        },
        'menu_bodas': {
            message: "👰🤵 **Protocolos para Bodas**: Seleccione el nivel de gala deseado:",
            options: [
                { text: "⚔️ Solo Cruce de Sables", response: "boda_sencilla" },
                { text: "🎖️ Protocolo Imperial Completo", response: "boda_imperial" },
                { text: "🔙 Volver", response: "precios" }
            ]
        },
        'boda_sencilla': {
            message: "Has elegido **Cruce de Sables**. Incluye 6 elementos con uniforme de gala. ¿Deseas verificar fecha?",
            options: [{ text: "🗓️ Ver Disponibilidad", response: "agendar_cita" }, { text: "🔙 Volver", response: "menu_bodas" }]
        },
        'boda_imperial': {
            message: "Has elegido **Protocolo Imperial**. Incluye Calle de Honor, Brindis y Escolta. ¿Consultamos fecha?",
            options: [{ text: "🗓️ Ver Disponibilidad", response: "agendar_cita" }, { text: "🔙 Volver", response: "menu_bodas" }]
        },
        'menu_xv': {
            message: "🎉 **Protocolos para XV Años**: Seleccione el paquete de honor:",
            options: [
                { text: "💂 Escolta de Caballeros", response: "xv_escolta" },
                { text: "🎭 Vals Militar Coreografiado", response: "xv_vals" },
                { text: "🔙 Volver", response: "precios" }
            ]
        },
        'xv_escolta': {
            message: "La **Escolta de Caballeros** acompaña a la quinceañera en su entrada triunfal. ¿Verificamos fecha?",
            options: [{ text: "🗓️ Ver Disponibilidad", response: "agendar_cita" }, { text: "🔙 Volver", response: "menu_xv" }]
        },
        'xv_vals': {
            message: "El **Vals Militar** es una coreografía de alta disciplina y elegancia. ¿Verificamos disponibilidad?",
            options: [{ text: "🗓️ Ver Disponibilidad", response: "agendar_cita" }, { text: "🔙 Volver", response: "menu_xv" }]
        },
        'servicios': {
            message: "💂‍♂️ Ofrecemos protocolos de élite. ¿Cuál te interesa conocer?",
            options: [
                { text: "⚔️ Cruce de Sables", response: "info_sables" },
                { text: "🔙 Menú Principal", response: "main_menu" }
            ]
        },
        'info_sables': {
             message: "🌟 El **Cruce de Sables** es nuestro servicio más solicitado. ¿Deseas ver disponibilidad?",
             options: [
                { text: "🗓️ Consultar Fecha", response: "agendar_cita" },
                { text: "🔙 Menú Principal", response: "main_menu" }
             ]
        },
        'agendar_cita': {
            message: "🗓️ **Protocolo de Disponibilidad**: Seleccione el día y la hora para verificar nuestro despliegue:",
            calendar: true
        },
        'confirmar_envio': {
            message: "✅ **Resumen de Solicitud Listo**. Presiona el botón para enviar todos los detalles al administrador.",
            contact: true
        }
    };

    function generateResponse(key) {
        if (key === 'escribir_asesor') {
            window.open("https://wa.me/573209928037?text=Hola, necesito comunicarme con un asesor militar 🫡", "_blank");
            closeChat();
            return; 
        }

        const data = responses[key];
        if (!data) return;

        // --- MEJORA: INDICADOR DE "ESCRIBIENDO" ---
        const typingId = 'typing-' + Math.random().toString(36).substr(2, 9);
        const typingIndicator = document.createElement('div');
        typingIndicator.id = typingId;
        typingIndicator.classList.add('bot-message');
        typingIndicator.innerHTML = "<i>Escribiendo...</i>";
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            const indicator = document.getElementById(typingId);
            if(indicator) indicator.remove();

            const messageGroup = document.createElement('div');
            messageGroup.classList.add('message-group');

            const botMsg = document.createElement('p');
            botMsg.classList.add('bot-message');
            botMsg.innerHTML = data.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            messageGroup.appendChild(botMsg);

            if (data.calendar) {
                // Validación de fecha mínima (Mañana)
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const minDate = tomorrow.toISOString().split('T')[0];

                const calendarBox = document.createElement('div');
                calendarBox.style.cssText = "background:#1a1a1a; padding:12px; border-radius:8px; border:1px solid #c5a448; margin-top:10px;";
                calendarBox.innerHTML = `
                    <input type="date" id="chat-date" min="${minDate}" style="width:100%; margin-bottom:8px; padding:5px; background:#000; color:#fff; border:1px solid #444;">
                    <select id="chat-time" style="width:100%; margin-bottom:12px; padding:5px; background:#000; color:#fff; border:1px solid #444;">
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                    </select>
                    <button class="chat-option" id="btn-validar-fecha" style="background:#c5a448; color:black; width:100%; border:none; padding:10px; font-weight:bold; cursor:pointer;">CONFIRMAR DATOS</button>
                `;
                messageGroup.appendChild(calendarBox);
            }

            if (data.contact) {
                const fecha = document.getElementById('chat-date')?.value || "No seleccionada";
                const hora = document.getElementById('chat-time')?.value || "No seleccionada";
                const waMsg = encodeURIComponent(
                    `¡Hola! 👋 Vengo de su sitio web Corte Militar.\n\n` +
                    `🎖️ *SOLICITUD DE SERVICIO*\n` +
                    `📌 *Servicio:* ${seleccionUsuario.servicio}\n` +
                    `ℹ️ *Paquete:* ${seleccionUsuario.detalle}\n` +
                    `📅 *Fecha:* ${fecha}\n` +
                    `⏰ *Hora:* ${hora}\n\n` +
                    `¿Tienen disponibilidad? 🫡`
                );
                const btnWA = document.createElement('a');
                btnWA.href = `https://api.whatsapp.com/send?phone=573209928037&text=${waMsg}`;
                btnWA.target = "_blank";
                // Estilo centrado y profesional solicitado anteriormente
                btnWA.style.cssText = "background:#25D366; color:white; display:block; text-align:center; padding:12px; border-radius:5px; text-decoration:none; margin:15px auto; font-weight:bold; max-width:90%;";
                btnWA.textContent = "🟢 ENVIAR POR WHATSAPP";
                messageGroup.appendChild(btnWA);
            }

            if (data.options) {
                const menu = document.createElement('div');
                menu.classList.add('options-menu');
                data.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.classList.add('chat-option');
                    btn.textContent = opt.text;
                    btn.dataset.response = opt.response;
                    menu.appendChild(btn);
                });
                messageGroup.appendChild(menu);
            }

            chatBody.appendChild(messageGroup);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000); // 1 segundo de retraso para el efecto de escritura
    }

    chatBody.addEventListener('click', function(event) {
        if (event.target.id === 'btn-validar-fecha') {
            const date = document.getElementById('chat-date').value;
            if (!date) return alert("Por favor, seleccione una fecha.");
            
            // Mostrar elección del usuario en el chat
            const userMsg = document.createElement('p');
            userMsg.classList.add('user-message');
            userMsg.textContent = "Fecha confirmada: " + date;
            chatBody.appendChild(userMsg);
            
            generateResponse('confirmar_envio');
        }

        if (event.target.classList.contains('chat-option') && !event.target.id) {
            const responseKey = event.target.dataset.response;
            const textChosen = event.target.textContent;

            // --- MEJORA: MOSTRAR MENSAJE DEL USUARIO ---
            const userMsg = document.createElement('p');
            userMsg.classList.add('user-message');
            userMsg.textContent = textChosen;
            chatBody.appendChild(userMsg);

            if (responseKey.includes('boda') && responseKey !== 'menu_bodas') {
                seleccionUsuario.servicio = "Boda Militar";
                seleccionUsuario.detalle = textChosen;
            } else if (responseKey.includes('xv') && responseKey !== 'menu_xv') {
                seleccionUsuario.servicio = "Quinceañera Militar";
                seleccionUsuario.detalle = textChosen;
            }

            generateResponse(responseKey);
        }
    });

    chatOpenBtn.addEventListener('click', openChat);
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', closeChat);
    
    // Iniciar con el menú principal
    generateResponse('main_menu');
});