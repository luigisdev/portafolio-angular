import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    // Utilización de promesas

    return new Promise( (resolve, reject) => {

      this.http.get('https://angular-webapp-b95ee.firebaseio.com/productos_idx.json')
        .subscribe( ( resp: Producto[] ) => {
          // console.log(resp);
          this.productos = resp;
          // this.cargando = false;
          setTimeout( () => {
            this.cargando = false;
          }, 1500);
          resolve();
      });

    });

  }

  getProducto(id: string) {
    return this.http.get(`https://angular-webapp-b95ee.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar después de tener los productos cargados
        // aplcar filtro
        this.filtrarProductos( termino );
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }

    console.log( this.productosFiltrado );
  }

  filtrarProductos( termino: string ) {

    // console.log( this.productos );
    // se resetea el arreglo de los productos filtrados cada vez que se hace una nueva busqueda
    this.productosFiltrado = [];

    // se convierte a minusculas el termino de búsquedas
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      // ya que la categoria siempre es minuscula no se webkitConvertPointFromNodeToPage, pero el título si
      // para que no tome en cuenta las mayusculas introducidas
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( prod );
      }
    });

  }

}
