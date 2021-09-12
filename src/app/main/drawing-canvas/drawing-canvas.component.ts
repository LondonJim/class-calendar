import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter, OnInit, OnDestroy
} from '@angular/core';
import { DailyLayoutService } from "src/app/services/daily-layout.service";
import {fromEvent, Subscription} from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() paintBrush: {selectedColor: string, paintBrushSize: number};
  @Output() saveCanvasData = new EventEmitter<string>();

  displayFullScreen: boolean;
  fullScreenSub: Subscription;

  constructor(private dailyLayoutService: DailyLayoutService) { }

  sizeChange() {
  //  resize screen without stretching existing image, restores saved image back onto 'new' resized canvas
    this.canvasEl.width = this.canvasEl.offsetWidth;
    this.canvasEl.height = this.canvasEl.offsetHeight;
    this.canvasEl.style.width = '100%';
    this.canvasEl.style.height = '100%';
    this.cx.lineWidth = this.paintBrush.paintBrushSize;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.paintBrush.selectedColor;
  }

  @ViewChild('canvas') public canvas: ElementRef;
  canvasEl: HTMLCanvasElement;

  private cx: CanvasRenderingContext2D;

  ngOnInit() {
    this.displayFullScreen = this.dailyLayoutService.fullScreen;
    this.fullScreenSub = this.dailyLayoutService.fullScreenChange.subscribe(value => {
      this.displayFullScreen = value;
    })
  }

  public ngAfterViewInit() {
    this.setCanvas();
    this.captureEvents(this.canvasEl);
    document.getElementById('canvas').addEventListener('pointerup', e => {
      this.saveCanvasData.emit(this.canvasEl.toDataURL());
    })
  }

  public resetCanvas(){
    this.cx.clearRect(0, 0, this.canvasEl.offsetWidth, this.canvasEl.offsetWidth);
  }

  public drawCanvas(value){
    this.canvasEl.width = this.canvasEl.offsetWidth;
    this.canvasEl.height = this.canvasEl.offsetHeight;
    this.canvasEl.style.width = '100%';
    this.canvasEl.style.height = '100%';
    this.cx.lineWidth = this.paintBrush.paintBrushSize;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.paintBrush.selectedColor;
    if (value) {
      let img = new Image();
      img.onload = () => {
        this.cx.drawImage(img,0,0,img.width,img.height);
      }
      img.src = value ? value : null;
    }
  }

  private setCanvas() {
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');

    this.canvasEl.style.width = '100%';
    this.canvasEl.style.height = '100%';

    this.canvasEl.width = this.canvasEl.offsetWidth;
    this.canvasEl.height = this.canvasEl.offsetHeight;

    this.cx.lineWidth = this.paintBrush.paintBrushSize;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.paintBrush.selectedColor;
  }

  private defineSizeCanvas() {
    this.canvasEl.style.width = '100%';
    this.canvasEl.style.height = '100%';
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'pointerdown')
      .pipe(
        switchMap((e) => {
          return fromEvent(canvasEl, 'pointermove')
            .pipe(
              takeUntil(fromEvent(canvasEl, 'pointerup')),
              // takeUntil(fromEvent(canvasEl, 'mouseleave')), // if enabled it stops when you draw over an image
              pairwise()
            )
        })
      )
      .subscribe((res: [PointerEvent, PointerEvent]) => {
        res[0].preventDefault();
        res[1].preventDefault();
        const rect = canvasEl.getBoundingClientRect();

        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        this.cx.lineWidth = this.paintBrush.paintBrushSize;
        this.cx.strokeStyle = this.paintBrush.selectedColor;
        if (!this.displayFullScreen) {
          this.drawOnCanvas(prevPos, currentPos);
        }
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

  ngOnDestroy() {
    this.fullScreenSub.unsubscribe();
  }

}
