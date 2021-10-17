import {Component, HostListener, OnInit} from '@angular/core';
import { DailyLayoutService } from "src/app/services/daily-layout.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'class-calendar';
  paintBrush: {selectedColor: string, paintBrushSize: number} = {selectedColor: 'black', paintBrushSize: 1};
  deleteDrawing: boolean = false;
  displayFullScreen: boolean = true;
  dateOfWeek: {};
  pointerUpGlobal: {};

  @HostListener('window:pointerup', ['$event'])
  onPointerUp(event: {}) {
    this.pointerUpGlobal = event;
  }

  constructor(private dailyLayoutService: DailyLayoutService) { }

  ngOnInit(): void {
    this.dateOfWeek = this.dailyLayoutService.datesOfWeek[this.dailyLayoutService.selectedDay];
    this.dailyLayoutService.fullScreenChange.subscribe(value => {
      this.displayFullScreen = value;
      this.dateOfWeek = this.dailyLayoutService.datesOfWeek[this.dailyLayoutService.selectedDay];
    })
  }

  onDisplayFullScreen(isDisplayFullScreen) {
    this.dailyLayoutService.displayFullScreen(isDisplayFullScreen);
  }
}


