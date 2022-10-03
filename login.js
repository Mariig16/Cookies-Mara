let formulario = document.getElementById("login");
let formRegister = document.getElementById("register");
let resultado =  document.getElementById("error");

class Usuario {
    constructor(user, password){
        this.user = user;
        this.password = password;
    }
}

let usuarios= [];
let usuario = new Usuario("coder1", "1234");
let usuario2 = new Usuario("coder2", "1234");

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
              window.location.href = "productos.html"
              localStorage.setItem("usuario", user.user);
        } else if ((user.user =! userLogin) && (user.password =! passwordLogin) || 
        (user.user =! userLogin) || (user.password =! passwordLogin) ) {
            resultado.innerHTML = `<p> Acceso incorrecto, revise su usuario o contraseña</p>`
        }
    }
})