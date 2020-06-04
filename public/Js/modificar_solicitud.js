// @ts-nocheck

var solicitudParaActualizarString = window.localStorage.getItem('solicitudParaActualizar');
var solicitudParaActualizar = JSON.parse(solicitudParaActualizarString)
var solicitudes = traerSolicitudes();

const title = document.querySelector(".title");
const selector = document.querySelector('.sel');
const textArea = document.querySelector('#text-area');
const fechaElement = document.querySelector('#fecha');
const guardar = document.querySelector('.guardar');
const cancelar = document.querySelector('.cancelar');

function traerSolicitudes() {
    const solicitudesString = window.localStorage.getItem('solicitudes');
    const solicitudes = JSON.parse(solicitudesString);
    return solicitudes;
}

function renderMiSolicitud() {

    const { estado, fecha, descripcion } = solicitudParaActualizar[0]
    console.log(fecha, descripcion)
    const val = document.querySelector('.sel [value="' + estado + '"');

    title.innerHTML = descripcion;
    val.selected = true
    textArea.innerHTML = descripcion;
    fechaElement.value = fecha;
}

guardar.addEventListener('click', (e) => {
    e.preventDefault();
    const { id, checked } = solicitudParaActualizar[0]
    solicitudModificada = {
        id: id,
        fecha: fechaElement.value,
        descripcion: textArea.value,
        estado: selector.value,
        checked: checked
    }

    for (let i = 0; i < solicitudes.length; i++) {
        if (solicitudes[i].id === solicitudModificada.id)
            solicitudes[i] = solicitudModificada;
    }

    window.localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
    document.location.href = "solicitudes.html"
})

cancelar.addEventListener('click', (e) => {
    e.preventDefault();
    document.location.href = "solicitudes.html";
})

function renderNombreUsuario() {
    const nombreUsuario = window.localStorage.getItem('nombreUsuario')
    document.querySelector(".navbar__nombre").textContent = nombreUsuario;
}

renderNombreUsuario()
renderMiSolicitud()