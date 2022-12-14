document.addEventListener("DOMContentLoaded", () => {
  const tarjeta = document.getElementById("contenedorTag");
  let contenBuy = document.querySelector('.card-items');
  let priceTotal = document.querySelector('.price-total');
  let amountProduct = document.querySelector('.count-product');
  
  let compraProducts = [];
  let totalCard = 0;
  let countProduct = 0;
  
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
  
  function productos(){
    fetch('https://mariig16.github.io/apicokiesandmara/data/api.json')
    .then((res)=>res.json())
    .then((data)=>{
      data.forEach((info)=>{
        let caja = document.createElement('div');
        caja.innerHTML = `
        <div class="targ row m-2 card">
        <img src="${info.foto}" class="card-img-top mt-3" alt="...">
        
        <h5 class="card-title">${info.precio}</h5>
        <p class="card-text"><span>${info.title}</span></p>
        <a href="" data-id="${info.id}" id="btnAdd" class="btn add-to-cart btn-outline-primary">Agregar</a>
        </div>`
        ;
        tarjeta.appendChild(caja);
      })
    })
  }
  productos();
  
  loadEventListeners();
  function loadEventListeners(){
    tarjeta.addEventListener('click', addProductos);
    contenBuy.addEventListener('click', deleteProductos);
  }
  
  function deleteProductos(e) {
    if (e.target.classList.contains('delete-product')) {
      const deleteId = e.target.getAttribute('data-id');
      
      compraProducts.forEach(value => {
        if (value.id == deleteId) {
          let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
          totalCard =  totalCard - priceReduce;
          totalCard = totalCard.toFixed(2);
        }
      });
      compraProducts = compraProducts.filter(product => product.id !== deleteId);
      countProduct--;
    }
    if (compraProducts.length === 0) {
      priceTotal.innerHTML = 0;
      amountProduct.innerHTML = 0;
    }
    cargarHtml();
  }
  function addProductos(e){
    e.preventDefault();
    if(e.target.classList.contains('btn')){
      const selectProduct = e.target.parentElement;
      readContect(selectProduct);
    }
    
  }
  function readContect(product){
    const infoProduct = {
      image: product.querySelector('div img').src,
      price: product.querySelector('div h5').textContent,
      title: product.querySelector('div p span').textContent,
      id: product.querySelector('a').getAttribute('data-id'),
      amount: 1
    }
    compraProducts = [...compraProducts, infoProduct]
    cargarHtml();
    console.log(infoProduct);
    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);
    
    const exist = compraProducts.some(product => product.id === infoProduct.id);
    if (exist) {
      const pro = compraProducts.map(product => {
        console.log(product.length);
        if (product.id === infoProduct.id) {
          product.amount++;
          return product;
        } else {
          return product
        }
      });
      compraProducts = [...pro];
    } else {
      compraProducts = [...compraProducts, infoProduct]
      countProduct++;
  
    }

    cargarHtml();
  }
  
  function cargarHtml(){
    clearHtml();
    compraProducts.forEach(product =>{
      const {image, title, price, amount, id} = product;
      const row = document.createElement('div');
      row.classList.add('item');
      row.innerHTML = `
      <img src="${image}" alt="" width="5%">
      <div class="item-content">
      <h5>Precio: ${price}</h5>
      <h5 class="cart-price">${title}$</h5>
      <h6>Monto: ${amount}</h6>
      </div>
      <span class="delete-product" data-id="${id}">X</span>
      `;
      contenBuy.appendChild(row)
      amountProduct.innerHTML = countProduct;
      priceTotal.innerHTML = totalCard;
     
    });
  }
  function clearHtml(){
    contenBuy.innerHTML = '';
  }
})

