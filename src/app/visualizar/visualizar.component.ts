import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Producto } from '../core/interface/producto';
import { ProductosService } from '../core/services/productos.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss']
})
export class VisualizarComponent implements OnInit {
  private readonly subscriptions: Subscription[] = [];
  searchText:string;
  productos: Producto[];
  productoSeleccionado: Producto;
  constructor(private productoService: ProductosService
    ) { }

  ngOnInit(): void {
       this.productoService.getAllProducts().subscribe((data: Producto[])=>{
      this.productos = data;
      console.log(this.productos);
    })  
  }
  
  deleteProduct(sku){
    this.productoService.deleteProduct(sku).subscribe(res => {
      this.productos = this.productos.filter(item => item.sku !== sku);
      console.log('¡Producto Eliminado!');
    })
  }

  viewProduct(producto){
    this.productoSeleccionado = producto;
  }
}
