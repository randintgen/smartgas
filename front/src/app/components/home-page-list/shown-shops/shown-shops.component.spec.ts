import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShownShopsComponent } from './shown-shops.component';

describe('ShownShopsComponent', () => {
  let component: ShownShopsComponent;
  let fixture: ComponentFixture<ShownShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShownShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShownShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
