import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../core/services/productos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  producto: FormGroup;
  submitted=false;
  constructor(
    private productoService: ProductosService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    this.producto = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      brand: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      principalImage: new FormControl('', [Validators.required, Validators.pattern(urlRegex)]),
      otherImages: new FormControl(''),
    });
  }
  get f() { 
    return this.producto.controls; 
  }

  onSubmit(){
    this.submitted = true;
    if(this.producto.invalid){
      return;
    }
    console.log(this.producto.value);
    this.productoService.addProduct(this.producto.value).subscribe(res => {
         console.log('¡Producto agregado!');
         this.router.navigateByUrl('/visualizar');
    })
  }

}
