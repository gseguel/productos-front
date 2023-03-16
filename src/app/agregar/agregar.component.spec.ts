import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AgregarComponent } from './agregar.component';

describe('AgregarComponent', () => {
  let component: AgregarComponent;
  let fixture: ComponentFixture<AgregarComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ AgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Valida creacion de componente', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.producto.valid).toBeFalsy();
  });

  it('Validacion Formulario - name', () => {
    let name = component.producto.controls['name']
    expect(name.valid).toBeFalsy();
    expect(name.errors['required']).toBeTruthy();
  });
});
