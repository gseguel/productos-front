import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductosService } from './productos.service';
import { environment } from 'src/environments/environment';
import { Producto } from '../interface/producto';
const api = environment.api;

describe('ProductosService', () => {
  let service: ProductosService;
  let httpController: HttpTestingController;

  function mockRequest(path: string, method: string, response: any): any {
    const req = httpController.expectOne(`${api.host}${api.path}${path}`);
    expect(req.request.method).toBe(method);
    req.flush(response);
}

  const mockData = { 
    "status": "success", 
    "data": [{ 
      "sku": "FAL-1000005", 
      "name": "zapatilla", 
      "brand": "adidas", 
      "size": "39",
      "price": "39990",
      "principalImage": "https://falabella.scene7.com/is/image/Falabella/50100474_01?wid=1500&hei=1500&qlt=70",
      "otherImages": "" 
    }, 
    { 
      "sku": "FAL-1000006", 
      "name": "zapatilla", 
      "brand": "nike", 
      "size": "42",
      "price": "42990",
      "principalImage": "https://falabella.scene7.com/is/image/Falabella/50100474_01?wid=1500&hei=1500&qlt=70",
      "otherImages": "" 
     }] 
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers:[ProductosService]
    });
    service = TestBed.inject(ProductosService);
    httpController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => { 
    httpController.verify(); 
  });

  it('Valisa creación de servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Registro de producto', () => {
    const responseMock = {titulo: "Datos Guardados", contenido: "El producto ha sido guardado correctamente"};
    const producto: Producto = {
      sku:"",
      name:"zapatillas",
      brand:"nike",
      size:"43",
      price:56990,
      principalImage:"https://falabella.scene7.com/is/image/Falabella/50100474_01?wid=1500&hei=1500&qlt=70",
      otherImages:""} as any;;
      
      service.addProduct(producto).subscribe((response) => {
        expect(response).toEqual(responseMock);
      });
    mockRequest(api.endpoints.productos.agregar, 'POST', responseMock);
  });

  it('Obtener Productos', () => {
    const responseMock: Producto[] = 
    [
      {
        sku:"FAL-1000005",
        name:"d",
        brand:"s",
        size:"d",
        price:323.6,
        principalImage:"https://falabella.scene7.com/is/image/Falabella/50100474_01?wid=1500&hei=1500&qlt=70",
        otherImages:"e"
      },
      {
        sku:"FAL-1000006",
        name:"f",
        brand:"d",
        size:"v",
        price:323.6,
        principalImage:"https://falabella.scene7.com/is/image/Falabella/50100474_01?wid=1500&hei=1500&qlt=70",
        otherImages:""
      }
    ]
    service.getAllProducts().subscribe( response => {
      expect(response).toEqual(responseMock);
    });
    mockRequest(api.endpoints.productos.buscar, 'GET', responseMock);
  });

  it('Eliminar Productos', () => {
    const responseMock = {titulo: "Datos Eliminados", contenido: "El producto ha sido eliminado correctamente"};
   
    service.deleteProduct("FAL-1000005").subscribe( response => {
      expect(response).toEqual(responseMock);
    });
    mockRequest(api.endpoints.productos.eliminar+"FAL-1000005", 'DELETE', responseMock);
  });
    
  });
