
// window.onload = (e) => {
//     document.location.href="/public/html/login.html"

// }

window.onload = (e) => {
    renderNombreUsuario()
}

function renderNombreUsuario() {
    const nombreUsuario = window.localStorage.getItem('nombreUsuario')
    document.querySelector(".navbar__nombre").textContent = nombreUsuario;
}