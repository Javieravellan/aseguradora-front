import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNuevoComponent } from './agregar-nuevo.component';

describe('AgregarNuevoComponent', () => {
  let component: AgregarNuevoComponent;
  let fixture: ComponentFixture<AgregarNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarNuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
