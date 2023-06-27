var empleados = [];

class Empleado {
  constructor(id, nombre, apellido, genero, fechaNacimiento, fechaIngreso, salarioBasico) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.genero = genero;
    this.fechaNacimiento = fechaNacimiento;
    this.fechaIngreso = fechaIngreso;
    this.salarioBasico = salarioBasico;
    this.formacionAcademica = [];
  }

  crearEmpleado(id, nombre, apellido, genero, fechaNacimiento, fechaIngreso, salarioBasico) {

    // Verificar si la ID ya está registrada
    var idExistente = empleados.some(function (empleado) {
      return empleado.id === id;
    });

    if (idExistente) {
      alert("El Número de documento ya está registrado. No se puede crear el empleado.");
    } else {
      var empleado = new Empleado(id, nombre, apellido, genero, fechaNacimiento, fechaIngreso, salarioBasico);
      empleados.push(empleado);
      // Mostrar los empleados en consola
      console.log(empleados);
    }
  }

  buscarEmpleado(id) {
    var encontrado = false;
    for (var i = 0; i < empleados.length; i++) {
      if (empleados[i].id == id) {
        encontrado = true;
        document.getElementById("id").value = empleados[i].id;
        document.getElementById("nombre").value = empleados[i].nombre;
        document.getElementById("apellido").value = empleados[i].apellido;
        document.getElementById("genero").value = empleados[i].genero;
        document.getElementById("fechaNacimiento").value =
          empleados[i].fechaNacimiento;
        document.getElementById("fechaIngreso").value = empleados[i].fechaIngreso;
        document.getElementById("salarioBasico").value =
          empleados[i].salarioBasico;
        // Deshabilitar el campo de entrada con el id "id"
        document.getElementById("id").setAttribute("disabled", "disabled");
      }
    }
    if (!encontrado) {
      alert("Empleado no encontrado");
    }
  }

  buscarEmpleadoModal(id) {
    var encontrado = false;
    for (var i = 0; i < empleados.length; i++) {
      if (empleados[i].id == id) {
        encontrado = true;
        document.getElementById("nombreModal").value = empleados[i].nombre;
        document.getElementById("apellidoModal").value = empleados[i].apellido;
        document.getElementById("generoModal").value = empleados[i].genero;
        document.getElementById("fechaNacimientoModal").value = empleados[i].fechaNacimiento;
        document.getElementById("fechaIngresoModal").value = empleados[i].fechaIngreso;
        document.getElementById("salarioBasicoModal").value = empleados[i].salarioBasico;
        break; // Terminar el bucle cuando se encuentra el empleado
      }
    }

    if (!encontrado) {
      alert("Empleado no encontrado");
    }
  }

  actualizarEmpleadoModal(id) {
    var encontrado = false;
    var empleadoActualizado = null;
    for (var i = 0; i < empleados.length; i++) {
      if (empleados[i].id == id) {
        encontrado = true;
        empleados[i].nombre = document.getElementById("nombreModal").value;
        empleados[i].apellido = document.getElementById("apellidoModal").value;
        empleados[i].genero = document.getElementById("generoModal").value;
        empleados[i].fechaNacimiento = document.getElementById("fechaNacimientoModal").value;
        empleados[i].fechaIngreso = document.getElementById("fechaIngresoModal").value;
        empleados[i].salarioBasico = document.getElementById("salarioBasicoModal").value;

        empleadoActualizado = empleados[i];
        break; 
      }
    }

    if (encontrado) {
      alert("Empleado actualizado");
      console.log("Empleado actualizado:", empleadoActualizado);
    } else {
      alert("Empleado no encontrado");
    }
  }

}


let e = new Empleado();
//Funcion para crear empleado
function CrearEmpleado() {

  var id = document.getElementById("id").value;
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var genero = document.getElementById("genero").value;
  var fechaNacimiento = document.getElementById("fechaNacimiento").value;
  var fechaIngreso = document.getElementById("fechaIngreso").value;
  var salarioBasico = document.getElementById("salarioBasico").value;

  e.crearEmpleado(id, nombre, apellido, genero, fechaNacimiento, fechaIngreso, salarioBasico);
}

//funcion para buscar empleado
function BuscarEmpleado() {
  var id = document.getElementById("buscarId").value;
  e.buscarEmpleado(id);
}

//funcion para buscar empleado en el modal
function BuscarEmpleadoModal() {
  var id = document.getElementById("buscarIdModal").value;
  e.buscarEmpleadoModal(id);
}

//funcion para actualizar empleado en el modal
function ActualizarEmpleadoModal() {
  var id = document.getElementById("buscarIdModal").value;
  e.actualizarEmpleadoModal(id);
}

// calcular anios actuales con operador ternario para calcular la edad o la antiguedad
function Calculoanios(tipoCalculo) {
  var fechaIngresada = new Date(
    document.getElementById(
      tipoCalculo === "antiguedad" ? "fechaIngreso" : "fechaNacimiento"
    ).value
  );
  var fechaActual = new Date();
  var resultado = fechaActual.getFullYear() - fechaIngresada.getFullYear();

  // Ajustar el resultado si aún no se ha cumplido el aniversario este año
  if (
    fechaActual.getMonth() < fechaIngresada.getMonth() ||
    (fechaActual.getMonth() === fechaIngresada.getMonth() &&
      fechaActual.getDate() < fechaIngresada.getDate())
  ) {
    resultado--;
  }

  document.getElementById(
    tipoCalculo === "antiguedad" ? "antiguedad" : "edadactual"
  ).innerHTML = resultado;
  console.log(antiguedad);
}

// calcular prestaciones actuales
function CalcularPrestaciones() {
  var antiguedad = parseFloat(document.getElementById("antiguedad").innerHTML);
  var salarioBasico = parseFloat(
    document.getElementById("salarioBasico").value
  );

  if (isNaN(antiguedad) || isNaN(salarioBasico)) {
    document.getElementById("prestaciones").innerHTML =
      "Error: No a ingresado el salario o calculado la antiguedad.";
  } else {
    var prestaciones = (antiguedad * salarioBasico) / 12;
    document.getElementById("prestaciones").innerHTML = prestaciones;
  }
}
//---------------------------------------------------------------------------------------------------
// clase agregar formacion academica
class FormacionAcademica {
  constructor(tipo, institucion, fechaInicio, fechaFinalizacion) {
    this.tipo = tipo;
    this.institucion = institucion;
    this.fechaInicio = fechaInicio;
    this.fechaFinalizacion = fechaFinalizacion;
  }

  //metodo para agregar formacion academica al array formacionAcademica del empleado
  agregarFormacionAcademica(institucion, titulo, fechaObtencion) {
    var formacionAcademica = new FormacionAcademica(institucion, titulo, fechaObtencion);
    var id = document.getElementById("id").value;

    var empleado = empleados.find(function (empleado) {
      return empleado.id === id;
    });

    empleado.formacionAcademica.push(formacionAcademica);
    console.log(empleados);
  }

}

let f = new FormacionAcademica();
//funcion para agregar formacion academica
function AgregarFormacionAcademica() {
  var institucion = document.getElementById("institucion").value;
  var titulo = document.getElementById("titulo").value;
  var fechaObtencion = document.getElementById("fechaObtencion").value;

  f.agregarFormacionAcademica(institucion, titulo, fechaObtencion);
}