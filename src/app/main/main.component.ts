import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import { DailyLayoutService } from "src/app/services/daily-layout.service";
import { ScreenDisplayModel } from "../models/screen-display.model";
import {DrawingCanvasComponent} from "./drawing-canvas/drawing-canvas.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  displayedImages: ScreenDisplayModel[];
  selectedIndex: number;
  selectedX: number;
  selectedY: number;
  displayFullScreen: boolean;
  @Input() pointerUpGlobal: {};
  @Input() paintBrush: { selectedColor: string, paintBrushSize: number };
  @ViewChild(DrawingCanvasComponent) drawingCanvas;
  _deleteDrawing: boolean = false;
  @Input() set deleteDrawing (deleteDrawing: boolean) {
    if (deleteDrawing && this.drawingCanvas) {
      this._deleteDrawing = deleteDrawing;
      this.drawingCanvas.resetCanvas();
      this.saveCanvasData(null);
      this.deleteDrawing = false;
    }
  }
  get deleteDrawing(){
    return this._deleteDrawing;
  }
  @ViewChild('cursorBox') cursorBox: ElementRef;

  @HostListener('pointermove', ['$event']) onPointerMove(e) {
    if (e.path[0].id === 'canvas') {
      this.cursorBox.nativeElement.style.visibility = 'visible';
      this.cursorBox.nativeElement.style.top = e.offsetY + 'px';
      this.cursorBox.nativeElement.style.left = e.offsetX + 'px';
      this.cursorBox.nativeElement.style.width = this.paintBrush.paintBrushSize + 'px';
      this.cursorBox.nativeElement.style.height = this.paintBrush.paintBrushSize + 'px';
      this.cursorBox.nativeElement.style.backgroundColor = this.paintBrush.selectedColor;
    } else {
      this.cursorBox.nativeElement.style.visibility = 'hidden';
    }
  }

  @HostListener('pointerleave', ['$event']) onPointerLeave(e) {
    this.cursorBox.nativeElement.style.visibility = 'hidden';
  }

  @HostListener('window:resize', ['']) sizeChange() {
    this.resetCanvas();
    this.drawingCanvas.sizeChange();
  }

  constructor(private dailyLayoutService: DailyLayoutService) { }

  ngOnInit(): void {
    this.displayFullScreen = this.dailyLayoutService.fullScreen;
    this.dailyLayoutService.selectedDayChange.subscribe(value => {
      this.resetCanvas();
      this.displayedImages = this.dailyLayoutService.dailyLayout[this.dailyLayoutService.selectedDay].images;
    })
    this.dailyLayoutService.dailyLayoutChange.subscribe(value => {
      this.displayedImages = value[this.dailyLayoutService.selectedDay].images;
    });
  }

  resetCanvas() {
    this.drawingCanvas.resetCanvas();
    this.drawingCanvas.drawCanvas(this.dailyLayoutService.dailyLayout[this.dailyLayoutService.selectedDay].canvas)
  }

  ngAfterViewInit() {
    const images = this.dailyLayoutService.dailyLayout[this.dailyLayoutService.selectedDay].images;
    const canvas = this.dailyLayoutService.dailyLayout[this.dailyLayoutService.selectedDay].canvas;

    setTimeout(() => {
      if (images) this.displayedImages = this.dailyLayoutService.dailyLayout[this.dailyLayoutService.selectedDay].images;
      if (canvas) this.drawingCanvas.drawCanvas(this.dailyLayoutService.dailyLayout[this.dailyLayoutService.selectedDay].canvas)
    })
  }

  saveCanvasData(canvas) {
    this.dailyLayoutService.saveCanvasData(canvas);
  }

  dragEnd(event, displayedImage, index) {
    const element = event.source.getRootElement();
    this.dailyLayoutService.updatePostion(event.distance.x, event.distance.y, index);
    element.style.transform = 'translate3d(0,0,0)';
  }

  dragMove(event) {
    const element = event.source.getRootElement();
    element.style.removeProperty('transform');
    element.style.transform = `translate3d(${event.distance.x}px,${event.distance.y}px,0)`;
  }

  onPointerDown(index, event) {
    // set so edit can only be triggered on a non movement action on image
    this.selectedIndex = index;
    this.selectedX = event.target.offsetLeft;
    this.selectedY = event.target.offsetTop;
  }

  onShowEdit(index, event) {
    if (this.selectedIndex === index && this.selectedX === event.target.offsetLeft && this.selectedY === event.target.offsetTop) {
      this.dailyLayoutService.editModeToggle(index);
    }
  }

  onIncrease(index) {
    this.dailyLayoutService.increaseImageSize(index);
  }

  onDecrease(index) {
    this.dailyLayoutService.decreaseImageSize(index);
  }

  onIncreasePosition(index) {
    this.dailyLayoutService.increasePosition(index);
  }

  onDecreasePosition(index) {
    this.dailyLayoutService.decreasePosition(index);
  }

  onRemove(index) {
    this.dailyLayoutService.removeImage(index);
  }

}
