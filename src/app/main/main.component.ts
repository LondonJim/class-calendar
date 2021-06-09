import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { DailyLayoutService } from "src/app/services/daily-layout.service";
import { ScreenDisplayModel } from "../models/screen-display.model";
import {DrawingCanvasComponent} from "./drawing-canvas/drawing-canvas.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  displayedImages: ScreenDisplayModel[];
  displayedCanvas: string;
  selectedIndex: number;
  selectedX: number;
  selectedY: number;
  @Input() paintBrush: { selectedColor: string, paintBrushSize: number };
  @ViewChild(DrawingCanvasComponent) drawingCanvas;

  constructor(private dailyLayoutService: DailyLayoutService) { }

  ngOnInit(): void {
    this.dailyLayoutService.selectedDayChange.subscribe(value => {
      this.drawingCanvas.resetCanvas();
      this.drawingCanvas.drawCanvas(this.dailyLayoutService.dailyLayout[this.dailyLayoutService.selectedDay].canvas)
      this.displayedImages = this.dailyLayoutService.dailyLayout[this.dailyLayoutService.selectedDay].images;
    })
    this.dailyLayoutService.dailyLayoutChange.subscribe(value => {
      this.displayedImages = value[this.dailyLayoutService.selectedDay].images;
    });
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

  onMouseDown(index, event) {
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
