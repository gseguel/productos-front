import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../core/interface/producto';
import { ProductosService } from '../core/services/productos.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {
  producto: Producto;
  skuParam: string;
  form: FormGroup;

  constructor(
    private productoService: ProductosService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.skuParam = this.route.snapshot.params['sku'];
    this.productoService.getProductById(this.skuParam).subscribe((data: Producto)=>{
      this.producto = data;
    });
    
    this.form = new FormGroup({
      sku: new FormControl(''),
      name: new FormControl(''),
      brand: new FormControl(''),
      size: new FormControl(''),
      price: new FormControl(''),
      principalImage: new FormControl(''),
      otherImages: new FormControl(''),
      
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.productoService.updateProduct(this.form.value).subscribe(res =>{
      console.log('¡Producto Actualizado!');
      this.router.navigateByUrl('/visualizar');
    });
  }
}
