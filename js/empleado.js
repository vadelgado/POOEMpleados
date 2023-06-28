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
      return true;     
    } else {
      var empleado = new Empleado(id, nombre, apellido, genero, fechaNacimiento, fechaIngreso, salarioBasico);
      empleados.push(empleado);
      // Mostrar los empleados en consola
      console.log(empleados);
      return false;   
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
      Swal.fire(
        'Empleado no encontrado',
        "",
        'warning'
      )
    }
    else{
      Swal.fire(
        'Empleado encontrado',
        "",
        'success'
      )
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
      Swal.fire(
        'Empleado no encontrado',
        "",
        'warning'
      )
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
      Swal.fire(
        'Empleado actualizado',
        "",
        'success'
      )
      console.log("Empleado actualizado:", empleadoActualizado);
    } else {
      Swal.fire(
        'Empleado no encontrado',
        "",
        'warning'
      )
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
   
  if(id=="" || nombre=="" || apellido=="" || genero=="" || fechaNacimiento=="" || fechaIngreso==""
    || salarioBasico =="" ){
      Swal.fire(
        'Alerta',
        'Por favor, llene todos los campos de DATOS PERSONALES y el SALARIO.',
        'warning'
      )
    } 
    else{
      var respuesta = e.crearEmpleado(id, nombre, apellido, genero, fechaNacimiento, fechaIngreso, salarioBasico);
      if(respuesta){
        Swal.fire(
          'Alerta',
          'El Número de documento ya está registrado. No se puede crear el empleado.',
          'warning'
        )
      }
      else{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Guardado exitoso revise la consola!',
          showConfirmButton: false,
          timer: 1800
        })
        LimpiarCampos();
      }
   
    }

 

}

function LimpiarCampos(){
  var limpiar = document.getElementById("limpiar");
  var id = document.getElementById("id");
  var edad = document.getElementById('edadactual');
  var antiguedad =document.getElementById('antiguedad');
  var pres =document.getElementById('prestaciones');
  edad.textContent="Edad Actual";
  antiguedad.textContent="Antiguedad Actual";
  pres.textContent = "Valor Prestaciones";
  
  id.disabled=false;
  limpiar.click();
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

//funcion para buscar empleado en el modal de formación academica
function BuscarEmpleadoModalFormacion() {
  var id = document.getElementById("buscarFA").value;
  e.buscarEmpleado(id);
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

  //
  if (isNaN(fechaIngresada)) {
    document.getElementById(
      tipoCalculo === "antiguedad" ? "antiguedad" : "edadactual"
    ).innerHTML = "0";
  } else {
    document.getElementById(
      tipoCalculo === "antiguedad" ? "antiguedad" : "edadactual"
    ).innerHTML = resultado;
    console.log(antiguedad);
  }

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

    if(id!=""){
      var empleado = empleados.find(function (empleado) {
        return empleado.id === id;
      });
  
      empleado.formacionAcademica.push(formacionAcademica);
      console.log(empleados);

      return true;
    }
    else{
      return false;
    }

   
  }

}

let f = new FormacionAcademica();
//funcion para agregar formacion academica
function AgregarFormacionAcademica() {
  var institucion = document.getElementById("institucion").value;
  var titulo = document.getElementById("titulo").value;
  var fechaObtencion = document.getElementById("fechaObtencion").value;
  if(institucion=="" || titulo=="" || fechaObtencion ==""){
    Swal.fire(
      'Alerta',
      'Por favor, llene todos los campos',
      'warning'
    )
  }else{
   var confirmar = f.agregarFormacionAcademica(institucion, titulo, fechaObtencion);
   if (confirmar){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Guardado exitoso!',
      showConfirmButton: false,
      timer: 1800
    })
   }
   else{
    Swal.fire(
      'Alerta',
      "Por favor, ingrese la identificación del empleado y verifique que el empleado exista.",
      'warning'
    )
   }

  }

}

