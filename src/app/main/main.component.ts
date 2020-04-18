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
      console.log(this.displayedImages);
    });
  }

  dragEnd(event, displayedImage, index) {
    const element = event.source.getRootElement();
    console.log(event);
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
    console.log(event);
    if (this.selectedIndex === index && this.selectedX === event.target.offsetLeft && this.selectedY === event.target.offsetTop) {
      this.dailyLayoutService.editModeToggle(this.day, index);
    }
  }
}
