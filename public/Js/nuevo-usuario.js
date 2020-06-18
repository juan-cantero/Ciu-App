// @ts-nocheck
var usuarios = traerUsuarios();

class formUI {
  get fechaPicker(){
    return document.querySelector('#fecha')
  }

  get avatarElement() {
    return document.querySelector('#avatar')
  }

  get nombreElement() {
    return document.querySelector('#nombre')
  }

  get passwordElement() {
    return document.querySelector('#password')
  }

  get estadoElement() {
    return document.querySelector('#estado')
  }
  
  get enviarElement() {
    return document.querySelector('.guardar')
  }
  get cancelarElement() {
    return document.querySelector('.cancelar')
  }
}

class UserForm {
  constructor(formUI,usuarios){
    this.formUI = formUI
    this.usuarios = usuarios
    this.addEventListeners()
  }
  get fecha() {
    return this.formUI.fechaPicker.value
  }

  get avatar() {
    return this.formUI.avatarElement.value
  }

  get nombre() {
    return this.formUI.nombreElement.value
  }

  get password() {
    return this.formUI.passwordElement.value
  }

  get estado() {
    return this.formUI.estadoElement.value
  }

  enviar() {
    const usuario = {
      fecha : this.fecha,
      avatar:this.avatar,
      usuario:this.nombre,
      contrasenia:this.password,
      activo:this.estado,
      checked:false
    }
    
    this.usuarios.push(usuario)
    console.log(usuarios)
    window.localStorage.setItem('usuarios',JSON.stringify(usuarios))
    document.location.href="usuarios.html"
  }

  addEventListeners() {
    this.formUI.enviarElement.addEventListener('click',(e)=>{
      e.preventDefault()
      this.enviar()
    })

    this.formUI.cancelarElement.addEventListener('click',(e)=>{
      e.preventDefault();
      document.location.href = "usuarios.html"
    })
  }
}

function traerUsuarios() {
    const usuariosJson = window.localStorage.getItem('usuarios')
    const usuarios = JSON.parse(usuariosJson)
    return usuarios;
}

function renderNombreUsuario() {
  const nombreUsuario = window.localStorage.getItem('nombreUsuario')
  document.querySelector(".navbar__nombre").textContent = nombreUsuario;
}


const userForm = new UserForm(new formUI(),usuarios);

renderNombreUsuario()