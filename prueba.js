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