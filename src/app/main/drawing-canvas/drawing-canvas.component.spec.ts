import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DrawingCanvasComponent } from './drawing-canvas.component';

describe('DrawingCanvasComponent', () => {
  let component: DrawingCanvasComponent;
  let fixture: ComponentFixture<DrawingCanvasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
