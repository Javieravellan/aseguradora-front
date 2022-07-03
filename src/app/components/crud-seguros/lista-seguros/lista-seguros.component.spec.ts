import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSegurosComponent } from './lista-seguros.component';

describe('ListaSegurosComponent', () => {
  let component: ListaSegurosComponent;
  let fixture: ComponentFixture<ListaSegurosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSegurosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSegurosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
