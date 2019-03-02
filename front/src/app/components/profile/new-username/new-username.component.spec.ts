import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsernameComponent } from './new-username.component';

describe('NewUsernameComponent', () => {
  let component: NewUsernameComponent;
  let fixture: ComponentFixture<NewUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
