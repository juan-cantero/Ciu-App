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

    if (validarCamposNulos(user.usuario, user.contrasenia) &&
        validarCampoUsuario(user.usuario) && validarCampoContrasenia(user.contrasenia)) {
        let data = await traerUsuarioDeJson();
        await guardarSolicitudes();
        await guardarNombreDeUsuario(user.usuario);
        console.log(user.usuario)
        buscarUsuario(data.usuarios, user);
    } else {
        alertaLogin("Contraseña invalida! Debe haber al menos una letra y un número", changePasswordStyle)
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

function validarCamposNulos(usuario, contrasenia) {
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

function validarCampoUsuario(usuario) {
    if (usuario.length != 8) {
        alertaLogin("El usuario debe contener 8 caracteres!", changeUserStyle)
    } else {
        return true;
    }
}

function validarCaracter(caracter, inicio, fin) {
    return (caracter >= inicio) && (caracter <= fin)
}

function validarCampoContrasenia(contrasenia) {
    let esLetra = false;
    let esNumero = false;

    if (contrasenia.length <= 6) {
        for (var i = 0; i < contrasenia.length; i++) {
            caracter = contrasenia.charCodeAt(i);
            // console.log("Tiene numero");
            // console.log(caracter)
            // console.log(validarCaracter(caracter, 48, 57));
            // console.log("Tiene letra minuscula");
            // console.log(caracter)
            // console.log(validarCaracter(caracter, 97, 122));

            if (validarCaracter(caracter, 97, 122)) {
                esLetra = true;
            } else if (validarCaracter(caracter, 48, 57)) {
                esNumero = true
            }
        }
    }
    return esNumero && esLetra;
}

const buscarUsuario = (usuarios, user) => {
    const usuarioEncontrado = usuarios.filter(u =>
        u.usuario == user.usuario &&
        u.contrasenia == user.contrasenia
    );

    if (usuarioEncontrado.length === 0) {
        alertaUsuario("Usuario y/o contraseña Incorrectos");
    } else {
        usuarioEncontrado[0].activo === "si" ? document.location.href = "inicio.html" 
        : alertaUsuario("El usuario esta inactivo")
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
    console.log(data)
    const user = data.usuarios.find(u => u.usuario == nombreAGuardar);
    console.log(user);
    console.log(nombreAGuardar)
    if (user != undefined) {
        window.localStorage.setItem('nombreUsuario', user.nombre);
        window.localStorage.setItem('usuario', user.usuario);
        console.log("guardar nombre de usuario")
    } else {
        console.log("Usuario no encontrado")
    }
}
