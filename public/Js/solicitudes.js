

async function traerSolicitudes() {
    const response = await fetch('./Json/solicitudes.json');
    const data = await response.json();
    const {solicitudes} = data;
    return solicitudes;
}



async function createTable() {
    const table = document.querySelector(".solicitudes-tabla");
    const solicitudes = await traerSolicitudes();
    for (let i = 0; i < solicitudes.length; i++) {
        //por cada solicitud desestructuro la info
        let {fecha,descripcion,estado} = solicitudes[i];
        // creo un elemento tr que es el row 
        let tr = document.createElement("tr");
        //creo las columnas
        let fechaNodo = document.createElement("td");
        let descripcionNodo = document.createElement("td");
        let estadoNodo = document.createElement("td");
        //creo los nodos con texto adentro por cada columna
        let fechaNodoText = document.createTextNode(`${fecha}`);
        let descripcionNodoText = document.createTextNode(`${descripcion}`);
        let estadoNodoText = document.createTextNode(`${estado}`);
        //le agrego el texto a cada columna
        fechaNodo.appendChild(fechaNodoText);
        descripcionNodo.appendChild(descripcionNodoText);
        estadoNodo.appendChild(estadoNodoText)
        // agrego todos las columnas al row
        tr.appendChild(fechaNodo);
        tr.appendChild(descripcionNodo);
        tr.appendChild(estadoNodo);
        // agrego el row con todas las columnas a la tabla
        table.appendChild(tr);

    }

}

createTable()