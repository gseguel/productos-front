import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from './core/interface/producto';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Producto[], filterString: string, property: string): any {
    if (!value) {
      return null;
    }
    if( value.length === 0 || !filterString){
      return value;
    }
    debugger;
    let filteredProducts: Producto[] = [];
    for (let producto of value) {
      if (producto[property].toLowerCase().includes(filterString.toLowerCase())) {
        filteredProducts.push(producto);
      }
    }
    return filteredProducts;
  }

}
