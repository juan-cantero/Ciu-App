// @ts-nocheck


var solicitudParaActualizar ;

async function traerSolicitudes() {
    const response = await fetch('./Json/solicitudes.json');
    const data = await response.json();
    return data;
}



async function renderSolicitudes() {
    const data = await traerSolicitudes()
    let table = `<tr>
                        <th>fecha</th>
                        <th>descripcion</th>
                        <th>solicitud</th>

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
        let solicitudes = document.querySelectorAll('.solicitud-tabla-checked');
        let data = await traerSolicitudes();

        for(let i = 0; i < solicitudes.length; i++) 
            data[i].checked = solicitudes[i].checked
        
        solicitudCheckeada = data.filter(d => d.checked);

        if(solicitudCheckeada.length > 1) {
            alert("debe seleccionar solo una solicitud")
            return;
        }
        else {
            return solicitudCheckeada;
        }
}



const botonModificar = document.getElementById("Modificar");
botonModificar.addEventListener("click",async (e)=> {
    e.preventDefault();
    solicitudParaActualizar= await getSolicitudChequeada()
    console.log(solicitudParaActualizar)
    
})






async function main(){
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



