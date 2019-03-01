import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerOnMapComponent } from './marker-on-map.component';

describe('MarkerOnMapComponent', () => {
  let component: MarkerOnMapComponent;
  let fixture: ComponentFixture<MarkerOnMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerOnMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
