// @ts-nocheck
const usuario = document.querySelector("#usuario");
const contrasenia = document.querySelector("#contrasenia");
const alerta = document.querySelector("#alerta");
const botonIniciar = document.getElementById("boton-iniciar");


botonIniciar.addEventListener("click", (event) => {
    event.preventDefault();
    iniciarSesion();
});

async function traerUsuarioDeJson() {
    const response = await fetch('../Json/usuarios.json');
    const data = await response.json()
    return data;
}

async function iniciarSesion() {
    const user = {
        usuario: usuario.value,
        contrasenia: contrasenia.value
    }

    if (validarCampos(user.usuario, user.contrasenia)) {
        let data = await traerUsuarioDeJson();
        await guardarSolicitudes();
        await guardarNombreDeUsuario(user.usuario);
        buscarUsuario(data.usuarios, user);
    }
}

function changeUserStyle() {
    usuario.style.borderBottom = "1px solid red";
}

function changePasswordStyle() {
    contrasenia.style.borderBottom = "1px solid red";

}

function changeAlertStyle() {
    usuario.style.borderBottom = "1px solid red";
    contrasenia.style.borderBottom = "1px solid red";
}

function validarCampos(usuario, contrasenia) {
    if (usuario == "" && contrasenia == "") {
        alertaLogin("Campos vacios. Por favor,inténtelo otra vez.", changeAlertStyle);
    }
    else if (usuario == "") {
        alertaLogin("Debe ingresar nombre de usuario", changeUserStyle)
        usuario.style.borderBottom = "1px solid red";
    }
    else if (contrasenia == "") {
        alertaLogin("Debe ingresar contrasenia", changePasswordStyle)
        contrasenia.style.borderBottom = "1px solid red";
    }
    else return true;
}

const buscarUsuario = (usuarios, user) => {
    const usuarioEncontrado = usuarios.filter(u =>
        u.usuario == user.usuario &&
        u.contrasenia == user.contrasenia
    );

    if (usuarioEncontrado.length === 0) {
        alertaUsuario("Usuario y/o contraseña Incorrectos");
    } else {
        document.location.href = "inicio.html";
        console.log("Iniciando sesion...")
    }
}

const alertaLogin = (mensaje, next) => {
    next(usuario)
    alerta.innerHTML = mensaje;
    // @ts-ignore
    alerta.style.display = "block";
    setTimeout(() => {
        // @ts-ignore
        alerta.style.display = "none";
    }, 3000);
}

const alertaUsuario = (mensaje, next) => {
    alerta.innerHTML = mensaje;
    alerta.style.display = "block";
    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
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

async function guardarNombreDeUsuario(nombreAGuardar) {
    const data = await traerUsuarioDeJson();
    const user = data.usuarios.find(u => u.usuario === nombreAGuardar);
    console.log(user);

    if(user != undefined){
        window.localStorage.setItem('nombreUsuario', user.usuario);
    }else{
        console.log("Usuario no encontrado")
    }
}
