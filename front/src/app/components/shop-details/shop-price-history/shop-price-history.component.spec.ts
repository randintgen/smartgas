import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPriceHistoryComponent } from './shop-price-history.component';

describe('ShopPriceHistoryComponent', () => {
  let component: ShopPriceHistoryComponent;
  let fixture: ComponentFixture<ShopPriceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPriceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPriceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
