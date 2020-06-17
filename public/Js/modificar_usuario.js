// @ts-nocheck
var usuarios = traerUsuarios()
var usuarioAModificar = getUsuarioAModificar()
const formularioUI = new formUI()
const formulario = new UserForm(formularioUI,usuarios)


 function traerUsuarios() {
    const usuariosJson = window.localStorage.getItem('usuarios')
    const usuarios = JSON.parse(usuariosJson)
    return usuarios;

}

function getUsuarioAModificar() {
  const usuarioAModifiCarJson = window.localStorage.getItem('usuarioAModificar')
  const  usuarioAModificar = JSON.parse(usuarioAModifiCarJson);
  return usuarioAModificar

}

function renderUsuario() {
  console.log(usuarioAModificar)
  const {fecha,avatar,usuario,password, estado} = usuarioAModificar[0]
  formularioUI.fechaPicker.value = fecha;
  formularioUI.avatarElement.value = avatar;
  formularioUI.nombreElement.value = usuario;
  formularioUI.passwordElement.value = password;
  formularioUI.estadoElement.value = estado;
}

renderUsuario()