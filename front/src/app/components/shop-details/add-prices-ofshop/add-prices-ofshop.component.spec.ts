import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPricesOfshopComponent } from './add-prices-ofshop.component';

describe('AddPricesOfshopComponent', () => {
  let component: AddPricesOfshopComponent;
  let fixture: ComponentFixture<AddPricesOfshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPricesOfshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPricesOfshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
