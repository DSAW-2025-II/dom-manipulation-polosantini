/*Constantes hechas para agregar nuevas tareas*/
const agregarButton = document.getElementById("agregarButton");
const tareaInput = document.getElementById("tareaInput");
const tablaTareas = document.getElementById("tablaTareas");
const fechaActual = new Date().toISOString().split('T')[0];
const fechaInput = document.getElementById("fechaInput");
fechaInput.setAttribute('min',fechaActual);

/*Constante que representa la tabla de tareas completadas en el documento*/
const tablaTareasCompletas = document.getElementById("tablaTareasCompletas");

/*Event listener del botón de agregar tareas*/
agregarButton.addEventListener("click", agregarTarea);

/*Función que agrega una tarea en la tabla de tareas pendientes*/
function agregarTarea() {

    /*Constantes que obtienen los inputs del nombre de la tarea y la fecha límite establecida por el usuario*/
    const tareaTexto = tareaInput.value.trim();
    const fechaLimite = fechaInput.value;

    if (tareaTexto === "" || fechaLimite === ""){
        alert("Chin@, fíjese bien en los detalles y note que le falta el nombre de la tarea, la fecha límite o las dos. Lea, porque cuando la mente no piensa el cuerpo sufre, ¿si o qué?");
        return;
    }

    /*Creación de una nueva fila en la tabla de tareas*/
    const fila = document.createElement("tr");

    /*Creación de un table data que contiene el nombre de la tarea*/
    const columnaTarea = document.createElement("td");
    columnaTarea.textContent = tareaTexto;

    /*Creación de un table data que contiene el estado de la tarea, se marca como pendiente por default*/
    const columnaEstado = document.createElement("td");
    columnaEstado.textContent = "Pendiente";

    /*Creación de un table data que contiene la fecha límite de la tarea*/
    const columnaFecha = document.createElement("td");
    columnaFecha.textContent = fechaLimite;

    /*Creación de un table data que contiene el botón de eliminar*/
    const columnaEliminar = document.createElement("td");
    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "X";
    /*Event listener del bot+on de eliminar tareas, que la elimina del documento */
    eliminarButton.addEventListener("click", function() {
        eliminarFila(fila);
    });
    columnaEliminar.appendChild(eliminarButton);

    /*Creación de un table data que contiene el botón de completar*/
    const columnaCompletar = document.createElement("td");
    const completarButton = document.createElement("button");
    completarButton.textContent = "✓";
    /*Event listener del botón de completar tarea, que lleva esa tarea a la otra tabla*/
    completarButton.addEventListener("click", function(){
        completarTarea(tablaTareasCompletas, tareaTexto, fechaLimite);
        eliminarFila(fila);
    });
    columnaCompletar.appendChild(completarButton);

    /*Append de todos los elementos de la nueva fila a la fila*/
    fila.appendChild(columnaTarea);
    fila.appendChild(columnaEstado);
    fila.appendChild(columnaFecha);
    fila.appendChild(columnaCompletar);
    fila.appendChild(columnaEliminar);

    /*Append de la nueva fila a la tabla de tareas pendientes */
    tablaTareas.appendChild(fila);

    document.getElementById("tareaInput").value="";
    document.getElementById("fechaInput").value="";
}

/*Función para completar tareas*/
function completarTarea(tablaDestino, textoTarea, fechaTarea){

    /*Creación de una nueva fila para agregar los elementos a su estado completado*/
    const filaCompletado = document.createElement("tr");

    /*Creación de un table data que contiene el nombre de la tarea, solo que está estilizado para que se vea amrcado por una línea transversal*/
    const columnaTextoTareaCompleta = document.createElement("td");
    columnaTextoTareaCompleta.textContent = textoTarea;
    columnaTextoTareaCompleta.style.textDecoration = "line-through";
    columnaTextoTareaCompleta.style.color = "gray"

    /*Creación de un table data que contiene el estado de la tarea, solo que se marca como completado por default*/
    const columnaEstadoTarea = document.createElement("td");
    columnaEstadoTarea.textContent = "Completado";

    /*Copiado de la fecha de la tarea*/
    const columnaFechaTarea = document.createElement("td");
    columnaFechaTarea.textContent = fechaTarea;

    /*Columna con el botón de eliminar*/
    const columnaEliminarButton = document.createElement("td");
    const eliminadoButton = document.createElement("button");
    eliminadoButton.textContent = "X";
    eliminadoButton.addEventListener("click", function() {
        eliminarFila(filaCompletado);
    });
    columnaEliminarButton.appendChild(eliminadoButton);

    /*Columna con el botón de "descompletar"*/
    const columnaCompletarButton = document.createElement("td");
    const completadoButton = document.createElement("button");
    completadoButton.textContent = "⟲";
    completadoButton.addEventListener("click", function() {
        descompletarTarea(tablaTareas, textoTarea, fechaTarea, filaCompletado);
    })
    columnaCompletarButton.appendChild(completadoButton);

    filaCompletado.appendChild(columnaTextoTareaCompleta);
    filaCompletado.appendChild(columnaEstadoTarea);
    filaCompletado.appendChild(columnaFechaTarea);
    filaCompletado.appendChild(columnaCompletarButton);
    filaCompletado.appendChild(columnaEliminarButton);

    tablaDestino.appendChild(filaCompletado);
}

/*Función para "descompletar" tareas*/
function descompletarTarea(tablaDestino, textoTarea, fechaTarea, filaActual){

    /*Básicamente esta función es lo mismo que al de completar tareas, pero a la inversa xD*/
    const filaDescompletado = document.createElement("tr");

    const columnaTextoTareaCompleta = document.createElement("td");
    columnaTextoTareaCompleta.textContent = textoTarea;

    const columnaEstadoTarea = document.createElement("td");
    columnaEstadoTarea.textContent = "Pendiente";

    const columnaFechaTarea = document.createElement("td");
    columnaFechaTarea.textContent = fechaTarea;

    const columnaEliminarButton = document.createElement("td");
    const eliminadoButton = document.createElement("button");
    eliminadoButton.textContent = "X";
    eliminadoButton.addEventListener("click", function() {
        eliminarFila(filaDescompletado);
    });
    columnaEliminarButton.appendChild(eliminadoButton);

    const columnaCompletarButton = document.createElement("td");
    const completadoButton = document.createElement("button");
    completadoButton.textContent = "✓";
    completadoButton.addEventListener("click", function(){
        completarTarea(tablaTareasCompletas, textoTarea, fechaTarea);
        eliminarFila(filaDescompletado);
    })
    columnaCompletarButton.appendChild(completadoButton);

    filaDescompletado.appendChild(columnaTextoTareaCompleta);
    filaDescompletado.appendChild(columnaEstadoTarea);
    filaDescompletado.appendChild(columnaFechaTarea);
    filaDescompletado.appendChild(columnaCompletarButton);
    filaDescompletado.appendChild(columnaEliminarButton);

    tablaDestino.appendChild(filaDescompletado); 

    eliminarFila(filaActual);
}

/*Función para eliminar una fila*/
function eliminarFila(row) {
    row.remove();
}