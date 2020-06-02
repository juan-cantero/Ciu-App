const usuario = document.querySelector("#usuario");
const contrasenia = document.querySelector("#contrasenia");
const alerta = document.querySelector("#alerta");
const botonIniciar = document.getElementById("boton-iniciar");

//setAyuda();

botonIniciar.addEventListener("click",(event) => {
    event.preventDefault();
    iniciarSesion();
});

async function traerUsuarioDeJson() {
    const response = await fetch('./Json/usuarios.json');
    const data = await response.json()
    return data;
}

async function iniciarSesion(){
    const user = {
        // @ts-ignore
        usuario: usuario.value,
        // @ts-ignore
        contrasenia: contrasenia.value
    }

    if (user.usuario == "" && user.contrasenia == "") {
        alertaLogin("Campos vacios. Por favor,inténtelo otra vez.");    
        // @ts-ignore
        usuario.style.borderBottom = "1px solid red";
        // @ts-ignore
        contrasenia.style.borderBottom = "1px solid red";
    }
    else {
        let data = await traerUsuarioDeJson();
        await guardarSolicitudes();
        await guardarNombreDeUsuario(user.usuario);
        buscarUsuario(data.usuarios, user);
    }
}

const buscarUsuario = (usuarios, user) => {
    const usuarioEncontrado = usuarios.filter(u =>
        u.usuario == user.usuario &&
        u.contrasenia == user.contrasenia
    );

    if (usuarioEncontrado.length === 0) {
        alertaLogin("El usuario no existe!");
    } else {
        document.location.href= "solicitudes.html";
        console.log("Iniciando sesion...")
    }
}

const alertaLogin = (mensaje) => {
    alerta.innerHTML = mensaje;
    // @ts-ignore
    alerta.style.display = "block";
    setTimeout(() => {
        // @ts-ignore
        alerta.style.display = "none";
    }, 3000);
}

async function traerSolicitudesDeJson() {
    const response = await fetch('./Json/solicitudes.json');
    const data = await response.json();
    return data;
}

async function guardarSolicitudes() {
    const data = await traerSolicitudesDeJson()
    window.localStorage.setItem('solicitudes',JSON.stringify(data));
    
}

async function guardarNombreDeUsuario(nombreAGuardar) {
    const data = await traerUsuarioDeJson();
    const users = data.usuarios.filter(u => u.usuario === nombreAGuardar);
    const {usuario} = users[0];
    window.localStorage.setItem('nombreUsuario',usuario);
}









// function mostrarAyuda(ayuda) {
//     document.getElementById('ayuda').innerHTML = ayuda;
// }

// function makeHelpCallback(ayuda) {
//     return function () {
//         mostrarAyuda(ayuda);
//     };
// }

// function setAyuda() {
//     var textoAyuda = [
//         { 'id': 'usuario', 'ayuda': 'Ingrese su usuario' },
//         { 'id': 'contrasenia', 'ayuda': 'Ingrese su contraseña' }
//     ];

//     for (var i = 0; i < textoAyuda.length; i++) {
//         var item = textoAyuda[i];
//         document.getElementById(item.id).onfocus = makeHelpCallback(item.ayuda);
//     }
// }

