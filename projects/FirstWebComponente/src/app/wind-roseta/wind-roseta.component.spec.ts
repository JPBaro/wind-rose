import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindRosetaComponent } from './wind-roseta.component';

describe('WindRosetaComponent', () => {
  let component: WindRosetaComponent;
  let fixture: ComponentFixture<WindRosetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindRosetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindRosetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
