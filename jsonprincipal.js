document.addEventListener("DOMContentLoaded", () => {
  class Usuario {
    constructor(user, password){
        this.user = user;
        this.password = password;
    }
}

let usuarios= [];
let usuario = new Usuario("Sasha", "1234");
let usuario2 = new Usuario("Emiliano", "1234");
  const tarjeta = document.getElementById("contenedorTag");
  fetch();
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
  let ingresar = document.querySelector("#ingresar");
  ingresar.addEventListener("click", (e) => {
    e.preventDefault();
    swal.fire({
      title: "ACCESO RESTRINGIDO",
      text: "Debes iniciar sesión para acceder a este espacio",
      icon: "warning",
      confirmButtonText: "Ok",
      cancelButtonText: "Cancelar",
      padding: "3em",
      background: "#f27474",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#000000",
      allowOutsideClick: false,
      showCloseButton: false,
    })
    .then(resultado => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        console.log("*Redirección página de logeo*");
        window.location.href = "login.html"
      }
    });
  })
  usuarios.push(usuario,usuario2);

formRegister.addEventListener("submit",(e) => {
    e.preventDefault();
    let userLogin = document.getElementById("userRegister").value;
    let passwordLogin = document.getElementById("passRegister").value;

    if (userLogin && passwordLogin) {
        let nuevoUsuario = new Usuario (userLogin, passwordLogin);

        usuarios.push(nuevoUsuario)
        alert("Su registro ha sido exitoso", nuevoUsuario.user)
        console.log(usuarios)
    }
    })




formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let userLogin = document.getElementById("user").value;
    let passwordLogin = document.getElementById("pass").value;

    for (let user of usuarios) {
        if (user.user == userLogin && user.password == passwordLogin ) {
              alert("Acceso correcto");
              window.location.href = "imc.html"
              localStorage.setItem("usuario", user.user);
        } else if ((user.user =! userLogin) && (user.password =! passwordLogin) || 
        (user.user =! userLogin) || (user.password =! passwordLogin) ) {
            resultado.innerHTML = `<p> Acceso incorrecto, revise su usuario o contraseña</p>`
        }
    }
})
})


 