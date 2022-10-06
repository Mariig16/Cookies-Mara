document.addEventListener("DOMContentLoaded", () => {
  const tarjeta = document.getElementById("contenedorTag");
  let contenBuy = document.querySelector('.card-items');
  
  let compraProducts = [];
  
  
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
      
      buyThings.forEach(value => {
        if (value.id == deleteId) {
          let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
          totalCard =  totalCard - priceReduce;
          totalCard = totalCard.toFixed(2);
        }
      });
      compraProducts = compraProducts.filter(product => product.id !== deleteId);
      
      countProduct--;
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
      title: product.querySelector('div h5').textContent,
      price: product.querySelector('div p span').textContent,
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
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        compraProducts = [...pro];
    } else {
        compraProducts = [...buyThings, infoProduct]
        countProduct++;
    }
    cargarHtml();
  }
  
  function cargarHtml(product){
    clearHtml();
    compraProducts.forEach(product =>{
      const {image, title, price, amount, id} = product;
      const row = document.createElement('div');
      row.classList.add('item');
      row.innerHTML = `
      <img src="${image}" alt="" width="20%">
      <div class="item-content">
      <h5>${title}</h5>
      <h5 class="cart-price">${price}$</h5>
      <h6>Amount: ${amount}</h6>
      </div>
      <span class="delete-product" data-id="${id}">X</span>
      `;
      contenBuy.appendChild(row)
      
    });
  }
  function clearHtml(){
    contenBuy.innerHTML = '';
  }
})

