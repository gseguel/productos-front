import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interface/producto';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private api = environment.api;
  private endpoints = this.api.endpoints;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private readonly httpcli: HttpClient) { }

  addProduct(producto): Observable<Producto>{
    const endopoint = this.api.host + this.api.path + this.endpoints.productos.agregar;
    return this.httpcli.post<Producto>(endopoint, JSON.stringify(producto), this.httpOptions)
    .pipe(catchError(this.errorHandler)
    );
  }

  getAllProducts(): Observable<Producto[]>{
    const endopoint = this.api.host + this.api.path + this.endpoints.productos.buscar;
    return this.httpcli.get<Producto[]>(endopoint)
    .pipe(catchError(this.errorHandler)
    );
  }

  getProductById(sku): Observable<Producto> {
    const endopoint = this.api.host + this.api.path + this.endpoints.productos.getById + sku;
    return this.httpcli.get<Producto>(endopoint)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateProduct(producto): Observable<Producto> {
    const endopoint = this.api.host + this.api.path + this.endpoints.productos.modificar;
    return this.httpcli.put<Producto>(endopoint, JSON.stringify(producto), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteProduct(sku){
    const endopoint = this.api.host + this.api.path + this.endpoints.productos.eliminar + sku;
    return this.httpcli.delete<Producto>(endopoint)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error codigo: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
