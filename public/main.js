let plantillaProductos
let dataProductos
let   AgregarArt
let   eliminarArt
let   editarArt
let   verArt
let   agregarCart
let   eliminarCart

async function fetchData(url, options={}){

  try {
      const response = await fetch(url, options)
      const data = await response.text()
      return data
} catch(error) {
      console.log('error en el fetch')
}}

async function loadListeners(){
  
  let   injectedProducts = document.querySelector('#injectedProducts')
  let   admin = document.querySelectorAll('.admin')
  let   user= document.querySelectorAll('.user')
  AgregarArt= document.querySelectorAll('.AgregarArt')
  eliminarArt= document.querySelectorAll('.eliminarArt')
  editarArt= document.querySelectorAll('.editarArt')
  verArt= document.querySelectorAll('.verArt')
  agregarCart= document.querySelectorAll('.agregarCart')
  eliminarCart= document.querySelectorAll('.eliminarCart')
  
  user.forEach(tag=>tag.addEventListener('change', hideAdminOptions))
  admin.forEach(tag=>tag.addEventListener('change', showAdminOptions))
}

function hideAdminOptions(){
  AgregarArt.forEach(tag=>tag.classList.add("hide"))
  eliminarArt.forEach(tag=>tag.classList.add("hide"))
  editarArt.forEach(tag=>tag.classList.add("hide"))
}

function showAdminOptions(){
  
  eliminarArt.forEach(tag=>tag.classList.remove("hide"))
  editarArt.forEach(tag=>tag.classList.remove("hide"))
}

async function verTodosLosArticulos(){
  
  let urlTemplateProductos="/api/productsTemplate"
  let urlDataProductos="/api/productos"
  plantillaProductos = await fetchData(urlTemplateProductos)
  dataProductos = JSON.parse(await fetchData(urlDataProductos))
  injectedProducts.innerHTML = ejs.render(plantillaProductos, {dataProductos})
  loadListeners()
}

async function verArticulo(id){
  let url = `api/productos/${id}`
  let productoUnico = JSON.parse(await fetchData(url))
  let dataProductos=[]
  dataProductos.push(productoUnico)
  injectedProducts.innerHTML = ejs.render(plantillaProductos, {dataProductos})
}

async function elimiarArticulo(id){
  let url = `api/productos/${id}`
  let options = {
    method: 'DELETE'};
    await fetchData(url, options) // deletes the id product
    await verTodosLosArticulos()
  }

async function agregarAlCarrito(idArticuloAgregado){
  let idSession = verificarSessionStorage()
  let url = `api/carrito/${idArticuloAgregado}/productos`
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },    
    body:JSON.stringify({timeStamp: idSession})};
  let idCarrito = await fetchData(url, options)
  await verCarrito(idCarrito)
}

async function verCarrito(idCarrito){
  let url = `api/carrito/${idCarrito}/productos`
}


  
  (async ()=> {
    
    await verTodosLosArticulos();
    
  })()
  
  
  function verificarSessionStorage(){
    
    if(sessionStorage.getItem('cartTimeStamp'))
        {console.log(sessionStorage.getItem('cartTimeStamp'))
        return sessionStorage.getItem('cartTimeStamp')}
    else {
        return sessionStorage.setItem('cartTimeStamp', Date.now())
  }
    }