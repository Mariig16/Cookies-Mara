

// fetch();

fetch('https://mariig16.github.io/apicokiesandmara/data/api.json')
.then((res)=>res.json())
.then((data)=>{
  data.forEach((info)=>{
    let caja = document.createElement('div');
    caja.innerHTML = `
    <div class="targ row m-2 card">
    <img src="${info.foto}" class="card-img-top mt-3" alt="...">
    <div class="card-body">
    <h5 class="card-title">${info.precio}</h5>
    <p class="card-text"><span>${info.title}</span></p>
    <a href="#" class="btn btn-primary mb-1">Comprar</a>   
    </div>`;
    tarjeta.appendChild(caja);
  })
})

class Usuario {
  constructor(user, password){
      this.user = user;
      this.password = password;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  let bandera = false;
  let usuarios = [];
  // Declaración de elementos del DOM
  let userLogin = document.getElementById("userRegister").value;
  let passwordLogin = document.getElementById("passRegister").value;
  const tarjeta = document.getElementById("contenedorTag");
  let ingresar = document.getElementById("ingresar");
  ingresar.addEventListener("submit", (e) => {
    // Crear alert notificando que para acceder a este espacio debes iniciar sesión
    swal.fire({
      title: "ALERTA",
      text: "Debes iniciar sesión para acceder a este espacio",
      icon: "success",
      confirmButtonText: "Ok",
      padding: "3em",
      background: "#f27474",
      confirmButtonColor: "#000000",
      allowOutsideClick: false,
      showCloseButton: false,
    })
    window.location.href = "login.html"
})
})