import {Component, ElementRef, AfterViewInit, ViewChild, HostListener} from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements AfterViewInit {

  @HostListener('window:resize', [''])
  //resize screen without stretching existing image, restores saved image back onto 'new' resized canvas
  sizeChange() {
    this.canvasEl.width = this.canvasEl.offsetWidth;
    this.canvasEl.height = this.canvasEl.offsetHeight;
    this.canvasEl.style.width = '100%';
    this.canvasEl.style.height = '100%';
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    let img = new Image();
    img.src = this.existingCanvas;
    this.cx.drawImage(img,0,0,img.width,img.height);
  }
  @HostListener('window:mouseup', [''])
  //only save canvas image on mouse up (finish drawing)
  mouseUp(){
    this.existingCanvas = this.canvasEl.toDataURL();
  }

  @ViewChild('canvas') public canvas: ElementRef;
  canvasEl: HTMLCanvasElement;
  existingCanvas: any

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');

    this.canvasEl.style.width = '100%';
    this.canvasEl.style.height = '100%';

    this.canvasEl.width = this.canvasEl.offsetWidth;
    this.canvasEl.height = this.canvasEl.offsetHeight;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.captureEvents(this.canvasEl);
  }

  private defineSizeCanvas() {
    this.canvasEl.style.width = '100%';
    this.canvasEl.style.height = '100%';
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

}
