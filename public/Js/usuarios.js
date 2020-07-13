// @ts-nocheck
//var solicitudParaActualizar;
var usuarios = traerUsuarios();
var usuarioAModificar

const botonNuevoUsuario = document.querySelector('#Nuevo');
botonNuevoUsuario.addEventListener('click', (e) => {
    e.preventDefault()
    document.location.href = 'nuevo-usuario.html'
})

function traerUsuarios() {
    const usuariosJson = window.localStorage.getItem('usuarios')
    const usuarios = JSON.parse(usuariosJson)
    return usuarios;

}

function getUsuarioCheckeado() {
    // @ts-ignore
    let checkboxes = document.querySelectorAll('.usuario-tabla-checked');
    let data = traerUsuarios()

    for (let i = 0; i < checkboxes.length; i++)
        data[i].checked = checkboxes[i].checked

    let usuarioCheckeado = data.filter(d => d.checked);
    if (usuarioCheckeado.length > 1) {
        alert("Debe seleccionar solo un usuario")
        return null;
    }
    else {
        return usuarioCheckeado;
    }
}

function guardarUsuarioAModificar() {
    usuarioAModificar = getUsuarioCheckeado()
    if (usuarioAModificar.length > 0) {
        window.localStorage.setItem('usuarioAModificar', JSON.stringify(usuarioAModificar))
        document.location.href = 'modificar_usuario.html'
    }
    else {
        alert('Debe seleccionar al menos  un usuario')
    }
}

const botonModificar = document.querySelector('#Modificar');
botonModificar.addEventListener('click', (e) => {
    e.preventDefault()
    guardarUsuarioAModificar()
})

function borrarUsuario() {
    const usuarioABorrar = getUsuarioCheckeado()
    const listaUsuarios = traerUsuarios()

    if (usuarioABorrar.length > 1) {
        alert("No puede seleccionar mas de un usuario")
    }
    else {
        const index = listaUsuarios.indexOf(u => u.usuario
            === Number(usuarioABorrar[0].usuario))
        listaUsuarios.splice(index, 1)
        window.localStorage.setItem('usuarios', JSON.stringify(listaUsuarios))
        renderUsuarios()
    }
}

const botonBorrar = document.querySelector('#Borrar')
botonBorrar.addEventListener('click', (e) => {
    e.preventDefault()
    borrarUsuario()
})


async function renderUsuarios() {
    const Listausuarios = traerUsuarios();
    console.log(Listausuarios)
    let table = `<tr>
                    <th>Nombre</th>
                    <th>Avatar</th>
                    <th>Fecha</th>
                    <th>Activo</th>
                    <th>Seleccion</th>

                </tr>`;
    Listausuarios.forEach((usuario) => {

        table += `
                <tr>
                    <td>${usuario.nombre}</td>
                    <td><img src=${usuario.avatar} width="50"></td>
                    <td>${usuario.fecha}</td>
                    <td>${usuario.activo}</td>
                    <td><input type="checkbox" class="usuario-tabla-checked"></td>
                </tr>
            `
    });
    document.querySelector('.usuarios-tabla').innerHTML = table;
}

function renderNombreUsuario() {
    const nombreUsuario = window.localStorage.getItem('nombreUsuario')
    document.querySelector(".navbar__nombre").textContent = nombreUsuario;
    console.log(nombreUsuario);
}

renderUsuarios();
renderNombreUsuario();