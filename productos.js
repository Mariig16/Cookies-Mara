const registro = document.getElementById("datoRegistro");
let usuario = localStorage.getItem("usuario");
user.innerHTML = usuario;
fetch();

fetch('https://mariig16.github.io/apicokiesandmara/data/api.json')
        .then((res)=>res.json())
        .then((data)=>{
        data.forEach((info)=>{
          let caja = document.createElement('tbody');
          caja.innerHTML = 
          `<tbody><tr>
            <td>${info.id}</td>
            <td>${info.precio}</td>
            <td>${info.title}</td>
            <td>${info.foto}</td>
          </tr></tbody>`;
          registro.appendChild(caja);
        })
        })
