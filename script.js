const profesionales = ["Ana", "Luis"];
const servicios = ["Corte", "Color","barba","cejas"];
const horas = [
    "08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"
];
let citasOcupadas = [];

const agendaDiv = document.getElementById("container");
const resultado = document.getElementById("resultado");
const confirmar = document.getElementById("confirmar");
const servicioSelect = document.getElementById("servicio");
const fechaInput = document.getElementById("fecha");
const nombreInput = document.getElementById("nombre");
const telefonoInput = document.getElementById("telefono");
const correoInput = document.getElementById("correo");
const mensajeDiv = document.getElementById("mensaje");
const enviarWhatsapp = document.getElementById("enviarWhatsapp");
const enviarCorreo = document.getElementById("enviarCorreo");

let profesionalSeleccionado = null;
let horaSeleccionada = null;

// Selección de profesional por imagen
document.querySelectorAll('.img-profesional').forEach(img => {
    img.addEventListener('click', () => {
        profesionalSeleccionado = img.dataset.nombre;
        document.querySelectorAll('.img-profesional').forEach(i => i.classList.remove('seleccionado'));
        img.classList.add('seleccionado');
        renderizarBotones();
    });
});

function renderizarBotones() {
    agendaDiv.innerHTML = "";
    const servicio = servicioSelect.value;
    const fecha = fechaInput.value;
    if (!profesionalSeleccionado || !servicio || !fecha) return;

    const horasDisponibles = horas.filter(hora => {
        return !citasOcupadas.some(cita =>
            cita.profesional === profesionalSeleccionado &&
            cita.servicio === servicio &&
            cita.fecha === fecha &&
            cita.hora === hora
        );
    });

    horasDisponibles.forEach((hora) => {
        let htmlcode = `
            <div class="horas">
                <button class="hora">${hora}</button>
            </div>
        `;
        agendaDiv.innerHTML += htmlcode;
    });

    document.querySelectorAll(".hora").forEach((boton) => {
        boton.addEventListener("click", () => {
            resultado.textContent = boton.textContent;
            horaSeleccionada = boton.textContent;
            resultado.style.ba="red"
        });
    });
}

servicioSelect.addEventListener("change", renderizarBotones);
fechaInput.addEventListener("change", renderizarBotones);

confirmar.addEventListener("click", () => {
    const nombre = nombreInput.value;
    const telefono = telefonoInput.value;
    const correo = correoInput.value;
    const servicio = servicioSelect.value;
    const fecha = fechaInput.value;

    if (nombre && telefono && correo && profesionalSeleccionado && servicio && fecha && horaSeleccionada) {
        citasOcupadas.push({
            profesional: profesionalSeleccionado,
            servicio,
            fecha,
            hora: horaSeleccionada
        });
        const mensaje = `Cita registrada:\nNombre: ${nombre}\nTeléfono: ${telefono}\nCorreo: ${correo}\nProfesional: ${profesionalSeleccionado}\nServicio: ${servicio}\nFecha: ${fecha}\nHora: ${horaSeleccionada}`;
       // alert(mensaje);
       const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
     
        mensajeDiv.textContent = mensaje;
        resultado.textContent = "";
        horaSeleccionada = null;
        renderizarBotones();
    } else {
        alert("Completa todos los campos y selecciona profesional, fecha y hora.");
    }
});

/*Enviar por WhatsApp
enviarWhatsapp.addEventListener("click", () => {
    const nombre = nombreInput.value;
    const telefono = telefonoInput.value;
    const correo = correoInput.value;
    const servicio = servicioSelect.value;
    const fecha = fechaInput.value;
    if (nombre && telefono && correo && profesionalSeleccionado && servicio && fecha && horaSeleccionada) {
        const mensaje = `Cita registrada:\nNombre: ${nombre}\nTeléfono: ${telefono}\nCorreo: ${correo}\nProfesional: ${profesionalSeleccionado}\nServicio: ${servicio}\nFecha: ${fecha}\nHora: ${horaSeleccionada}`;
        const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    } else {
        alert("Completa todos los campos y selecciona profesional, fecha y hora.");
    }
});

// Enviar por correo (abre cliente de correo)
enviarCorreo.addEventListener("click", () => {
    const nombre = nombreInput.value;
    const telefono = telefonoInput.value;
    const correo = correoInput.value;
    const servicio = servicioSelect.value;
    const fecha = fechaInput.value;
    if (nombre && telefono && correo && profesionalSeleccionado && servicio && fecha && horaSeleccionada) {
        const asunto = "Confirmación de cita";
        const mensaje = `Cita registrada:\nNombre: ${nombre}\nTeléfono: ${telefono}\nCorreo: ${correo}\nProfesional: ${profesionalSeleccionado}\nServicio: ${servicio}\nFecha: ${fecha}\nHora: ${horaSeleccionada}`;
        const mailto = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
        window.open(mailto, "_blank");
    } else {
        alert("Completa todos los campos y selecciona profesional, fecha y hora.");
    }
});*/









