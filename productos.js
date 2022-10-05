let user = document.getElementById("user");
let usuario = localStorage.getItem("usuario");
user.innerHTML = usuario;
const tabla = document.querySelector('#lista-usuarios tbody');
let send = document.getElementById("registrarProducto");

send.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(send);
  const sendData = new URLSearchParams(data);

  console.log([...sendData]);

  fetch('https://mariig16.github.io/apicokiesandmara/data/api.json',{
    method: "POST",
    body: sendData,
  })
  .then(respuesta => respuesta.json())
  .then(sendData => console.log(sendData))
  .catch(err => console.log(err))

});


function cargarUsuarios() {
  fetch('https://mariig16.github.io/apicokiesandmara/data/api.json')
  .then(respuesta => respuesta.json()) //Indicamos el formato en que se desea obtener la información
  .then(usuarios => {
    usuarios.forEach(usuario => {
      const row = document.createElement('tr');
      row.innerHTML += `
      <td>${usuario.id}</td>
      <td>${usuario.precio}</td>
      <td>${usuario.title}</td>
      <td>${usuario.foto}</td>
      `;
      tabla.appendChild(row);
    });
  }) // Aquí mostramos dicha información
  .catch(error => console.log('Hubo un error : ' + error.message))
}

cargarUsuarios();