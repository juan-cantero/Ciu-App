// @ts-nocheck

var solicitudParaActualizar;
var solicitudes;

async function traerSolicitudes() {
    const solicitudesString = window.localStorage.getItem('solicitudes');
    const solicitudes = JSON.parse(solicitudesString);
    return solicitudes;
}

async function renderSolicitudes() {
    const data = solicitudes
    let table = `<tr>
                        <th>Fecha</th>
                        <th>Descripcion</th>
                        <th>Solicitud</th>
                        <th>Seleccion</th>

                    </tr>`;
    const solicitudesUsuario = data.filter(solicitud =>
        solicitud.solicitante == window.localStorage.getItem('usuario'))

    solicitudesUsuario.forEach((solicitud) => {

        table += `
                <tr>
                    <td>${solicitud.fecha}</td>
                    <td>${solicitud.descripcion}</td>
                    <td>${solicitud.estado}</td>
                    <td><input type="checkbox" class="solicitud-tabla-checked"></td>

                </tr>
            
            `
    });
    document.querySelector('.solicitudes-tabla').innerHTML = table;
}

async function getSolicitudChequeada() {
    // @ts-ignore
    let checkboxes = document.querySelectorAll('.solicitud-tabla-checked');
    let data = solicitudes

    for (let i = 0; i < checkboxes.length; i++)
        data[i].checked = checkboxes[i].checked

    solicitudCheckeada = data.filter(d => d.checked);
    if (solicitudCheckeada.length > 1) {
        alert("Debe seleccionar solo una solicitud")
        return null;
    }
    else {
        return solicitudCheckeada;
    }
}

const botonNuevaSolicitud = document.querySelector("#Nueva");
botonNuevaSolicitud.addEventListener('click', (e) => {
    e.preventDefault();
    document.location.href = "nueva_solicitud.html";
})

const botonModificar = document.getElementById("Modificar");
botonModificar.addEventListener("click", async (e) => {
    e.preventDefault();
    solicitudParaActualizar = await getSolicitudChequeada()
    console.log("Soli para actualizar")
    console.log(solicitudParaActualizar)
    if (solicitudParaActualizar.length > 0) {
        window.localStorage.setItem('solicitudParaActualizar', JSON.stringify(solicitudParaActualizar));
        document.location.href = "modificar_solicitud.html"
    } else {
        alert("Debes seleccionar una solicitud para editar")
    }
})

const botonBorrar = document.querySelector('#Borrar');
botonBorrar.addEventListener('click', async (e) => {
    e.preventDefault();
    let solicitudParaBorrar = await getSolicitudChequeada();
    if (solicitudParaBorrar.length > 0) {
        let index = solicitudes.findIndex(solicitud => solicitud.id === solicitudParaBorrar[0].id);
        solicitudes.splice(index, 1);
        window.localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
        main()
    } else {
        alert("Debes seleccionar una solicitud para borrar")
    }
})

function renderNombreUsuario() {
    const nombreUsuario = window.localStorage.getItem('nombreUsuario')
    document.querySelector(".navbar__nombre").textContent = nombreUsuario;
    console.log(nombreUsuario);
}

async function main() {
    solicitudes = await traerSolicitudes()
    console.log(solicitudes)
    await renderSolicitudes()
    renderNombreUsuario();
}

main()




