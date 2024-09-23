class Producto{
  constructor(nombre,cantidad,precio){
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;
    this.id = 0;
  }
  asignarID(id)
  {
    this.id = id;
  }
}

export default Producto;
