import Producto from "./Producto.js";

let productos = []
const btnAgregarProducto = document.getElementById('miBoton');
const listaP= document.getElementById('listaProductos');
const listaPFiltrados= document.getElementById('listaProductosFiltrados');
const filtroNombre = document.getElementById('filtroNombre');
const resetCarrito = document.getElementById('resetCarrito');

filtroNombre.onkeyup = filtrarLista;
cargarCarritoJSon()

function cargarCarritoJSon()
{
  let productosj = JSON.parse(localStorage.getItem('productos'));
  if(productosj){
    productos = productosj;
    for(let producto of productos){

      let nuevoItem = document.createElement("li");
      nuevoItem.id = producto.id
      nuevoItem.textContent = `${producto.nombre} - Cantidad:${producto.cantidad} - precio: ${producto.precio}`;
      listaP.appendChild(nuevoItem);
    }
    actualizarTotal();
  }
}

if (btnAgregarProducto) {
  btnAgregarProducto.addEventListener('click', function() {
    let nombreP = document.getElementById('txtNombreP').value;
    let cantP = document.getElementById('txtCantP').value;
    let precioP = document.getElementById('txtPrecioP').value;

    if(nombreP && precioP && cantP){
      console.log("Nombre: ", nombreP,"Cantidad: ", cantP, "Precio: ", precioP);
      let p = new Producto(nombreP, cantP, precioP);

      p.asignarID(productos.length);

      productos.push(p);
      console.log(productos);



      let nuevoItem = document.createElement("li");
      nuevoItem.id = p.id
      nuevoItem.textContent = `${nombreP} - Cantidad:${cantP} - precio: ${precioP}`;
      listaP.appendChild(nuevoItem);

      document.getElementById("txtNombreP").value = "";
      document.getElementById("txtCantP").value = "";
      document.getElementById("txtPrecioP").value = "";

      actualizarTotal();
      guardarCarritoJSon()

    }else {
      alert('ingresa algo en todos los campos capo');
     }
    });

  }

function actualizarTotal() {
  let totalCompra = document.getElementById('totalCompra');
  if(productos.length > 0){
    let total = productos.reduce((acumulador, producto) => {
      return acumulador + (producto.precio * producto.cantidad);
    }, 0);
    totalCompra.textContent = "Total de la compra: "+total;

  }else
  {
    totalCompra.textContent = "Total de la compra: 0";
  }

}


listaP.addEventListener('click', (e)=> {
  if(e.target.tagName === "LI")
  {
    quitarProductoLista(e.target.id);
    guardarCarritoJSon()
    actualizarTotal();
    e.target.remove();
  }
})


function quitarProductoLista(idP)
{
  productos.splice(idP,1)
}


function filtrarLista() {

  if(filtroNombre.value.length > 0) {
    listaP.style.display = "none"
    listaPFiltrados.style.display = "block"
    listaPFiltrados.innerHTML = "";
    for (const item of productos) {
      console.log(item.nombre)
      if (item.nombre.includes(filtroNombre.value)) {
        let itemFiltrado = document.createElement("li");
        itemFiltrado.textContent = `${item.nombre} - Cantidad:${item.cantidad} - precio: ${item.precio}`;
        listaPFiltrados.appendChild(itemFiltrado);
      }
    }
  } else {
    console.log("muestro comun");
    listaP.style.display = "block"
    listaPFiltrados.style.display = "none"
    listaPFiltrados.innerHTML = "";
  }

}

function vaciarCarrito() {
  productos.splice(0, productos.length);
  listaP.innerHTML = "";
  actualizarTotal();
  console.log("hola wenas tardes");
}

if(resetCarrito){
  resetCarrito.addEventListener('click', vaciarCarrito)
}

function guardarCarritoJSon()
{
  localStorage.setItem("productos", JSON.stringify(productos));
}

