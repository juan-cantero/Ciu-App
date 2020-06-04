// @ts-nocheck

var solicitudes = traerSolicitudes();
const textArea = document.querySelector('#text-area');
const guardar = document.querySelector('.guardar');
const cancelar = document.querySelector('.cancelar');

function traerSolicitudes() {
    const solicitudesString = window.localStorage.getItem('solicitudes');
    const solicitudes = JSON.parse(solicitudesString);
    return solicitudes;
}

function renderNombreUsuario() {
    const nombreUsuario = window.localStorage.getItem('nombreUsuario')
    document.querySelector(".navbar__nombre").textContent = nombreUsuario;
}

function guardarSolicitud() {
    solicitud = {
        id: solicitudes.length + 1,
        fecha: moment().format("YYYY-MM-DD"),
        descripcion: textArea.value,
        estado: "abierta",
        checked: false
    }

    solicitudes.push(solicitud);

    window.localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
    document.location.href = "solicitudes.html"
}

guardar.addEventListener('click', (e) => {
    e.preventDefault();
    guardarSolicitud();
})


cancelar.addEventListener('click', (e) => {
    e.preventDefault();
    document.location.href = "solicitudes.html";
})

renderNombreUsuario()