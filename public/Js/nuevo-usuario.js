// @ts-nocheck
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
}


class UserForm {
  constructor(){
    this.formUI = new formUI()
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

  enviar =  ()=> {
    const usuario = {
      fecha : this.fecha,
      avatar:this.avatar,
      usuario:this.nombre,
      contrasenia:this.password,
      activo:this.estado,
      checked:false
    }
    let usuarios =  traerUsuarios()
    usuarios.push(usuario)
    console.log(usuarios)
    window.localStorage.setItem('usuarios',JSON.stringify(usuarios))
    document.location.href="usuarios.html"
  }

  addEventListeners() {
    this.formUI.enviarElement.addEventListener('click',(e)=>{
      this.enviar()
      e.preventDefault()
    })
  }
}

 function traerUsuarios() {
    const usuariosJson = window.localStorage.getItem('usuarios')
    const usuarios = JSON.parse(usuariosJson)
    return usuarios;

}

const userForm = new UserForm();