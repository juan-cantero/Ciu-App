const usuario = document.querySelector("#usuario");
const contrasenia = document.querySelector("#contrasenia");
const alerta = document.querySelector("#alerta");
const botonIniciar = document.getElementById("boton-iniciar");

//setAyuda();

botonIniciar.addEventListener("click",(event) => {
    event.preventDefault();
    iniciarSesion();
});

async function iniciarSesion(){
    const user = {
        usuario: usuario.value,
        contrasenia: contrasenia.value
    }

    if (user.usuario == "" && user.contrasenia == "") {
        alertaLogin("Campos vacios. Por favor,inténtelo otra vez.");    
        usuario.style.borderBottom = "1px solid red";
        contrasenia.style.borderBottom = "1px solid red";
    }
    else {
        const response = await fetch('../Json/usuarios.json');
        const data = await response.json()
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
        console.log("Iniciando sesion...")
    }
}

const alertaLogin = (mensaje) => {
    alerta.innerHTML = mensaje;
    alerta.style.display = "block";
    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
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

