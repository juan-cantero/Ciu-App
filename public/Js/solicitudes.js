// @ts-nocheck


var solicitudParaActualizar ;
var solicitudes;






async function traerSolicitudes() {
    const solicitudesString = window.localStorage.getItem('solicitudes');
    const solicitudes = JSON.parse(solicitudesString);
    return solicitudes;

}



async function renderSolicitudes() {
    const data = solicitudes
    let table = `<tr>
                        <th>Fecha</th>
                        <th>Descripcion</th>
                        <th>Solicitud</th>
                        <th>Seleccion</th>

                    </tr>`;
    data.forEach((solicitud) => {
            
            table += `
                <tr>
                    <td>${solicitud.fecha}</td>
                    <td>${solicitud.descripcion}</td>
                    <td>${solicitud.estado}</td>
                    <td><input type="checkbox" class="solicitud-tabla-checked"></td>

                </tr>
            
            `
        });
        document.querySelector('.solicitudes-tabla').innerHTML=table;

}

async function getSolicitudChequeada() {
    // @ts-ignore
        let checkboxes = document.querySelectorAll('.solicitud-tabla-checked');
        let data = solicitudes

        for(let i = 0; i < checkboxes.length; i++) 
            data[i].checked = checkboxes[i].checked
        
        solicitudCheckeada = data.filter(d => d.checked);

        if(solicitudCheckeada.length > 1) {
            alert("debe seleccionar solo una solicitud")
            return null;
        }
        else {
            return solicitudCheckeada;
        }
}

const botonNuevaSolicitud = document.querySelector("#Nueva");
botonNuevaSolicitud.addEventListener('click',(e)=>{
    e.preventDefault();
    document.location.href="nueva_solicitud.html";
})

const botonModificar = document.getElementById("Modificar");
botonModificar.addEventListener("click",async (e)=> {
    e.preventDefault();
    solicitudParaActualizar= await getSolicitudChequeada()
    if (solicitudParaActualizar === null) {return}
    window.localStorage.setItem('solicitudParaActualizar',JSON.stringify(solicitudParaActualizar));
    document.location.href="modificar_solicitud.html"
    
})

const botonBorrar = document.querySelector('#Borrar');
botonBorrar.addEventListener('click', async (e)=> {
    e.preventDefault();
    let solicitudParaBorrar = await getSolicitudChequeada();
    let index = solicitudes.findIndex( solicitud => solicitud.id === solicitudParaBorrar[0].id);
    solicitudes.splice(index,1);
    window.localStorage.setItem('solicitudes',JSON.stringify(solicitudes));
    main()
    
})

function renderNombreUsuario() {
    const nombreUsuario = window.localStorage.getItem('nombreUsuario')
    document.querySelector(".navbar__nombre").textContent = nombreUsuario;
}






async function main(){
    renderNombreUsuario()
    solicitudes = await traerSolicitudes()
    

    await renderSolicitudes()

}

main()



// esta funcion la deje de ejemplo

// async function createTable() {
//     const table = document.querySelector(".solicitudes-tabla");
//     const solicitudes = await traerSolicitudes();
//     for (let i = 0; i < solicitudes.length; i++) {
//         //por cada solicitud desestructuro la info
//         let {fecha,descripcion,estado} = solicitudes[i];
//         // creo un elemento tr que es el row 
//         let tr = document.createElement("tr");
//         //creo las columnas
//         let fechaNodo = document.createElement("td");
//         let descripcionNodo = document.createElement("td");
//         let estadoNodo = document.createElement("td");
//         let inputNode = document.createElement('input')
//         inputNode.setAttribute('type','checkbox');
//         inputNode.setAttribute('class','solicitud-tabla-checked')
//         //creo los nodos con texto adentro por cada columna
//         let fechaNodoText = document.createTextNode(`${fecha}`);
//         let descripcionNodoText = document.createTextNode(`${descripcion}`);
//      async function createTable() {
//     const table = document.querySelector(".solicitudes-tabla");
//     const solicitudes = await traerSolicitudes();
//     for (let i = 0; i < solicitudes.length; i++) {
//         //por cada solicitud desestructuro la info
//         let {fecha,descripcion,estado} = solicitudes[i];
//         // creo un elemento tr que es el row 
//         let tr = document.createElement("tr");
//         //creo las columnas
//         let fechaNodo = document.createElement("td");
//         let descripcionNodo = document.createElement("td");
//         let estadoNodo = document.createElement("td");
//         let inputNode = document.createElement('input')
//         inputNode.setAttribute('type','checkbox');
//         inputNode.setAttribute('class','solicitud-tabla-checked')
//         //creo los nodos con texto adentro por cada columna
//         let fechaNodoText = document.createTextNode(`${fecha}`);
//         let descripcionNodoText = document.createTextNode(`${descripcion}`);
//         let estadoNodoText = document.createTextNode(`${estado}`);
//         //le agrego el texto a cada columna
//         fechaNodo.appendChild(fechaNodoText);
//         descripcionNodo.appendChild(descripcionNodoText);
//         estadoNodo.appendChild(estadoNodoText)
//         // agrego todos las columnas al row
//         tr.appendChild(fechaNodo);
//         tr.appendChild(descripcionNodo);
//         tr.appendChild(estadoNodo);
//         tr.appendChild(inputNode);
//         // agrego el row con todas las columnas a la tabla
//         table.appendChild(tr);
        
        
//     }
    
// }   let estadoNodoText = document.createTextNode(`${estado}`);
//         //le agrego el texto a cada columna
//         fechaNodo.appendChild(fechaNodoText);
//         descripcionNodo.appendChild(descripcionNodoText);
//         estadoNodo.appendChild(estadoNodoText)
//         // agrego todos las columnas al row
//         tr.appendChild(fechaNodo);
//         tr.appendChild(descripcionNodo);
//         tr.appendChild(estadoNodo);
//         tr.appendChild(inputNode);
//         // agrego el row con todas las columnas a la tabla
//         table.appendChild(tr);
        
        
//     }
    
// }



