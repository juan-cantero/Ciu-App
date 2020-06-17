// @ts-nocheck
//var solicitudParaActualizar;
var usuarios;

const botonNuevoUsuario = document.querySelector('#Nuevo');
botonNuevoUsuario.addEventListener('click',(e)=> {
    e.preventDefault()
    document.location.href = 'nuevo-usuario.html'
})

async function traerUsuarios() {
    const usuariosJson = window.localStorage.getItem('usuarios')
    const usuarios = JSON.parse(usuariosJson)
    return usuarios;

}

async function getUsuarioCheckeado() {
    // @ts-ignore
    let checkboxes = document.querySelectorAll('.usuario-tabla-checked');
    let data = usuarios

    for (let i = 0; i < checkboxes.length; i++)
        data[i].checked = checkboxes[i].checked

    let usuarioCheckeado = data.filter(d => d.checked);
    if (usuarioCheckeado.length > 1) {
        alert("Debe seleccionar solo una solicitud")
        return null;
    }
    else {
        return usuarioCheckeado;
    }
}



async function renderUsuarios() {
    const usuarios = await traerUsuarios();
    let table = `<tr>
                    <th>Nombre</th>
                    <th>Avatar</th>
                    <th>Fecha</th>
                    <th>Activo</th>
                    <th>Seleccion</th>

                </tr>`;
    usuarios.forEach((usuario) => {

        table += `
                <tr>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.avatar}</td>
                    <td>${usuario.fecha}</td>
                    <td>${usuario.activo}</td>
                    <td><input type="checkbox" class="usuario-tabla-checked"></td>
                </tr>
            
            `
    });
    document.querySelector('.usuarios-tabla').innerHTML = table;
}


renderUsuarios();