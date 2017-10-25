import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloApiComponent } from './hello-api.component';

describe('HelloApiComponent', () => {
  let component: HelloApiComponent;
  let fixture: ComponentFixture<HelloApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
