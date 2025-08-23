const agregarButton = document.getElementById("agregarButton");
const tareaInput = document.getElementById("tareaInput");
const tablaTareas = document.getElementById("tablaTareas");
const fechaActual = new Date().toISOString().split('T')[0];
const fechaInput = document.getElementById("fechaInput");
fechaInput.setAttribute('min',fechaActual);

agregarButton.addEventListener("click", agregarTarea);

function agregarTarea() {

    const tareaTexto = tareaInput.value.trim();
    const fechaLimite = fechaInput.value;

    if (tareaTexto === "" || fechaLimite === "") return;

    const fila = document.createElement("tr");

    const columnaTarea = document.createElement("td");
    columnaTarea.textContent = tareaTexto;

    const columnaEstado = document.createElement("td");
    columnaEstado.textContent = "Pendiente";

    const columnaFecha = document.createElement("td");
    columnaFecha.textContent = fechaLimite;

    const columnaCompletar = document.createElement("td");
    const completarButton = document.createElement("button");
    completarButton.textContent = "✓";
    completarButton.addEventListener("click", function(){
        if (columnaEstado.textContent == "Completo"){
            columnaEstado.textContent = "Pendiente";
            columnaTarea.style.textDecoration = "none";
            columnaTarea.style.color = "black";
        } else if(columnaEstado.textContent === "Pendiente") {
            columnaEstado.textContent = "Completo";
            columnaTarea.style.textDecoration = "line-through";
            columnaTarea.style.color = "gray";
        }
    });
    columnaCompletar.appendChild(completarButton);

    const columnaEliminar = document.createElement("td");
    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "X";
    eliminarButton.addEventListener("click", function() {
        eliminarFila(fila);
    });
    columnaEliminar.appendChild(eliminarButton);

    fila.appendChild(columnaTarea);
    fila.appendChild(columnaEstado);
    fila.appendChild(columnaFecha);
    fila.appendChild(columnaCompletar);
    fila.appendChild(columnaEliminar);

    tablaTareas.appendChild(fila);

    document.getElementById("tareaInput").value="";
}

function eliminarFila(row) {
    row.remove();
}

