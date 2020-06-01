// @ts-nocheck
var solicitudParaActualizarString = window.localStorage.getItem('solicitudParaActualizar');
var solicitudParaActualizar = JSON.parse(solicitudParaActualizarString)


function modificar() {
    
    const estado=solicitudParaActualizar[0].estado
    let val = document.querySelector('.sel [value="'+estado+'"');
    val.selected = true
}

modificar()