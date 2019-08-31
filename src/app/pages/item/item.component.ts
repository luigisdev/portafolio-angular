import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  id: string;

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService ) { }

  ngOnInit() {
    this.route.params.subscribe( parametros => {
      // También funciona de la siguiente manera como se muestra en el Video
      // pero la corrección del editor me gusta como quedó
      // console.log(parametros['id']);
      // console.log(parametros.id);

      this.productoService.getProducto(parametros.id).subscribe( (producto: ProductoDescripcion) => {
        this.id = parametros.id;
        this.producto = producto;
        // console.log(producto);
      });
    });
  }

}
