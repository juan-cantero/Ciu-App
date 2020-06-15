//var solicitudParaActualizar;
var usuarios;

async function traerUsuarios() {
    const response = await fetch('../Json/usuarios.json');
    const data = await response.json()
    return data;
}

async function renderUsuarios() {
    const data = await traerUsuarios();
    console.log(data)
    let table = `<tr>
                    <th>Nombre</th>
                    <th>Avatar</th>
                    <th>Activo</th>
                    <th>Seleccion</th>

                </tr>`;
    data.usuarios.forEach((usuario) => {

        table += `
                <tr>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.avatar}</td>
                    <td>${usuario.activo}</td>
                    <td><input type="checkbox" class="solicitud-tabla-checked"></td>
                </tr>
            
            `
    });
    document.querySelector('.usuarios-tabla').innerHTML = table;
}


renderUsuarios();