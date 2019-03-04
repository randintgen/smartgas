import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageListComponent } from './home-page-list.component';

describe('HomePageListComponent', () => {
  let component: HomePageListComponent;
  let fixture: ComponentFixture<HomePageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
