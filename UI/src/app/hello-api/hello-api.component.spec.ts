import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGame } from './hello-api.component';

describe('HelloApiComponent', () => {
  let component: PlayGame;
  let fixture: ComponentFixture<PlayGame>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayGame ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
