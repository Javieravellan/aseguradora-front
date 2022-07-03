import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNuevoClienteComponent } from './agregar-nuevo-cliente.component';

describe('AgregarNuevoClienteComponent', () => {
  let component: AgregarNuevoClienteComponent;
  let fixture: ComponentFixture<AgregarNuevoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarNuevoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarNuevoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
