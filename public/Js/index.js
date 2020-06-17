window.onload = (e) => {
     guardarUsuarios()
    guardarSolicitudes()
    document.location.href="/public/html/inicio.html"
    
}



function renderNombreUsuario() {
    const nombreUsuario = window.localStorage.getItem('nombreUsuario')
    document.querySelector(".navbar__nombre").textContent = nombreUsuario;

}

async function traerUsuariosDelJSON() {
    const response = await fetch('../Json/usuarios.json');
    const data = await response.json()
    return data;
}

async function guardarUsuarios() {
    const data = await traerUsuariosDelJSON();
    const {usuarios} = data
    window.localStorage.setItem('usuarios',JSON.stringify(usuarios))
}

async function traerSolicitudesDeJson() {
    const response = await fetch('../Json/solicitudes.json');
    const data = await response.json();
    return data;
}

async function guardarSolicitudes() {
    const data = await traerSolicitudesDeJson()
    window.localStorage.setItem('solicitudes', JSON.stringify(data));
}