import { Component, OnInit } from '@angular/core';
import { DailyLayoutService } from "src/app/services/daily-layout.service";
import { ScreenDisplayModel } from "../models/screen-display.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  displayedImages: ScreenDisplayModel[];
  day = 'monday'; // TODO change so multiple days can be selected
  selectedIndex: number;
  selectedX: number;
  selectedY: number;

  constructor(private dailyLayoutService: DailyLayoutService) { }

  ngOnInit(): void {
    this.dailyLayoutService.dailyLayoutChange.subscribe(value => {
      this.displayedImages = value[this.day];
    });
  }

  dragEnd(event, displayedImage, index) {
    const element = event.source.getRootElement();
    this.dailyLayoutService.updatePostion(this.day, event.distance.x, event.distance.y, index);
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
      this.dailyLayoutService.editModeToggle(this.day, index);
    }
  }

  onIncrease(index) {
    this.dailyLayoutService.increaseImageSize(this.day, index);
  }

  onDecrease(index) {
    this.dailyLayoutService.decreaseImageSize(this.day, index);
  }

  onIncreaseZ(index) {
    this.dailyLayoutService.increaseZ(this.day, index);
  }

  onDecreaseZ(index) {
    this.dailyLayoutService.decreaseZ(this.day, index);
  }

  onRemove(index) {
    this.dailyLayoutService.removeImage(this.day, index);
  }
}
