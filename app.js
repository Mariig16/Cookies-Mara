// //Simulación de asincronía
// setTimeout(() => {
//   alert("Hola cuenta 5 segundo")
// }, 5000);

class Paciente{
  constructor (documento, nombre){
    this.documento = Number(documento);
    this.nombre = nombre;
  }
}
// const fetchData = async() =>{
//   try{ 
//     const res = await fetch('api.json')
//     const data = await res.json()
//     console.log(data)
//   }
//   catch(error){
//     console.log(error)
//   }
// }

const keyLocalStorage = "listaPacientes";
document.addEventListener("DOMContentLoaded", () => {
  // fetchData();
  let bandera = false;
  let pacientes = []; // El arreglo global que vamos a manejar
  
  // Declaración de elementos del DOM
  const $contenedorPacientes = document.querySelector("#contenedorPacientes"),
  // $btnGuardarPaciente = document.querySelector("#btnAgregarPaciente"),
  $newPacienteDocumento = document.querySelector("#idocumento"),
  $newPacienteNombre = document.querySelector("#inombre");
  
  let btn = document.getElementById("btnAgregarPaciente");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const pDocument = $newPacienteDocumento.value;
    const pNombre = $newPacienteNombre.value;
    validar();
    if (bandera == true){
      if (!pDocument && pNombre) {
        return;
      }
      pacientes.push(new Paciente(pDocument, pNombre));
      $newPacienteDocumento.value = "";
      $newPacienteNombre.value = "";   
      // alert("Datos de: "+pNombre +" registrados correctamente")
      swal.fire({
        title: "Registro exitoso",
        text: "Datos de: "+pNombre +" guardados correctamente",
        icon: "success",
        confirmButtonText: "Ok",
        padding: "3em",
        background: "#f27474",
        confirmButtonColor: "#000000",
        allowOutsideClick: false,
        showCloseButton: false,
      })
      // alertaDatosNoValidos();
      guardarPacientesEnLocal();
      refrescarListaDePacientes();
    } 
    if(bandera == false){
        swal.fire({
        title: "Alerta",
        text: "Campos incompletos",
        icon: "warning",
        confirmButtonText: "Ok",
        padding: "3em",
        background: "#ff3f28",
        confirmButtonColor: "#000000",
        allowOutsideClick: false,
        showCloseButton: false,
      })
    }
  });

 

  //APLICAR OPERADOR TERNARIO Y LÓGICO OR
  function validar(){
    const pDocument = $newPacienteDocumento.value;
    const pNombre = $newPacienteNombre.value;
    const validado = (pDocument == '') || (pNombre == '') ? true : false;
    validado ? bandera = false : bandera = true;
  }

  const obtenerPacientesDeAlmacenamiento = () => {
    const posibleLista = JSON.parse(localStorage.getItem(keyLocalStorage));
    
    if (posibleLista) {
      console.log(posibleLista);
      return posibleLista;
    } else {
      return [];
    }
  };
  
  const guardarPacientesEnLocal = () => {
    localStorage.setItem(keyLocalStorage, JSON.stringify(pacientes));
    
  };
  //Líneas posibles para eliminar registros (Validar)
  const refrescarListaDePacientes = () => {
    $contenedorPacientes.innerHTML = "";
    for (const [indice, paciente] of pacientes.entries()) {
      const $enlaceParaEliminar = document.createElement("a");
      $enlaceParaEliminar.classList.add("enlace-eliminar");
      $enlaceParaEliminar.innerHTML = "&times;";
      $enlaceParaEliminar.href = "";
      $enlaceParaEliminar.onclick = (evento) => {
        evento.preventDefault();
        if (!confirm("¿Eliminar tarea?")) {
          return;
        }
        pacientes.splice(indice, 1);
        // Guardar los cambios
        guardarTareasEnAlmacenamiento(pacientes);
        refrescarListaDeTareas();
      };

      // let caja = document.createElement('tbody');
      // caja.innerHTML = `<tbody><td>${paciente.documento}</td>
      // <td>${paciente.nombre}</td></tbody>`;
      // $contenedorPacientes.appendChild(caja);
      //Aplicando FETCH

      // fetch('https://jsonplaceholder.typicode.com/users')
      fetch('./api.json')
        .then((res)=>res.json())
        .then((data)=>{
        data.forEach((info)=>{
          let caja = document.createElement('div');
          caja.innerHTML = `
          <div class="row m-2 d-inline-block card">
          <img src="${info.foto}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">${info.precio}</h5>
          <p class="card-text"><span>${info.title}</span></p>
          <a href="#" class="btn btn-primary">Comprar</a>   
          </div>`;
          $contenedorPacientes.appendChild(caja);
        })
        })

                  // <tbody><td>${info.id}</td>
          // <td>${info.name}</td>
          // <td>${info.username}</td>
          // <td>${info.email}</td></tbody>`;
          // ------
    }
  };
  // Llamar a la función la primera vez
  
  pacientes = obtenerPacientesDeAlmacenamiento();
  refrescarListaDePacientes();
  
  //spread de objetos
  console.log("Hola soy la lista", ...pacientes);
  
});
