class Usuarios{
  constructor (user, pass){
    this.user = Number(user);
    this.pass = pass;
  }
}

const keyLocalStorage = "listaUsuarios";
document.addEventListener("DOMContentLoaded", () => {
  // fetchData();
  let bandera = false;
  let usuarios = []; // El arreglo global que vamos a manejar
  
  // Declaración de elementos del DOM
  $newUsuarioUser = document.querySelector("#userRegister"),
  $newUsuarioPass = document.querySelector("#passRegister"),
  $UserRegistrado = document.querySelector("#user"),
  $PassRegistrado = document.querySelector("#pass");
  
  let btnRegistro = document.getElementById("registrar")
  let botonIngreso = document.getElementById("ingreso")
  
  
  
  btnRegistro.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("AQUI ESTOY")
    const pUser = $newUsuarioUser.value;
    const pPass = $newUsuarioPass.value;
    validar();
    if (bandera == true){
      if (!pUser && pPass) {
        return;
      }
      usuarios.push(new Usuarios(pUser, pPass));
      $newUsuarioUser.value = "";
      $newUsuarioPass.value = "";   
      // alert("Datos de: "+pNombre +" registrados correctamente")
      swal.fire({
        title: "Registro exitoso",
        text: "Usuario: "+pUser +" creado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
        padding: "3em",
        background: "#f27474",
        confirmButtonColor: "#000000",
        allowOutsideClick: false,
        showCloseButton: false,
      })
      // alertaDatosNoValidos();
      guardarUsuariosEnLocal();
      
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
  botonIngreso.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Cargando...")
    let userLogin = document.getElementById("user").value;
    let passwordLogin = document.getElementById("pass").value;
    for (let user of usuarios) {
      if (user.user == userLogin && user.pass == passwordLogin ) {
        swal.fire({
          title: "Bienvenido",
          text: "Usuario: "+userLogin +"",
          icon: "success",
          confirmButtonText: "Ok",
          padding: "3em",
          background: "#f27474",
          confirmButtonColor: "#000000",
          allowOutsideClick: false,
          showCloseButton: false,
        })
        window.location.href = "productos.html"
        localStorage.setItem("usuario", user.user);
      }
      else if  (userLogin == '' || passwordLogin == '' ){
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
      }
      else if (user.user != userLogin && user.pass != passwordLogin ){
        if(bandera == false){
          swal.fire({
            title: "Error",
            text: "Acceso incorrecto",
            icon: "error",
            confirmButtonText: "Ok",
            padding: "3em",
            background: "#ff3f28",
            confirmButtonColor: "#000000",
            allowOutsideClick: false,
            showCloseButton: false,
          })
          
        }
      }
    }
  });
  //APLICAR OPERADOR TERNARIO Y LÓGICO OR
  function validar(){
    const pUser = $newUsuarioUser.value;
    const pPass = $newUsuarioPass.value;
    const validado = (pUser == '') || (pPass == '') ? true : false;
    validado ? bandera = false : bandera = true;
  }
  
  const obtenerUsuariosRegistrado = () => {
    const posibleLista = JSON.parse(localStorage.getItem(keyLocalStorage));
    if (posibleLista) {
      console.log(posibleLista);
      return posibleLista;
    } else {
      return [];
    }
  };
  
  const guardarUsuariosEnLocal = () => {
    localStorage.setItem(keyLocalStorage, JSON.stringify(usuarios));
    
  };    
  usuarios = obtenerUsuariosRegistrado();     
  
  console.log("Hola soy la lista", ...usuarios);
  
});