import {Component, OnInit} from '@angular/core';
import { DailyLayoutService } from "src/app/services/daily-layout.service";
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'class-calendar';
  paintBrush: {selectedColor: string, paintBrushSize: number};
  deleteDrawing: boolean;
  displayFullScreen: boolean = false;
  todayDate = moment().format('dddd Do MMMM YYYY');

  constructor(private dailyLayoutService: DailyLayoutService) { }

  ngOnInit(): void {
    this.dailyLayoutService.fullScreenChange.subscribe(value => {
      this.displayFullScreen = value;
    })
  }

  onDisplayFullScreen(isDisplayFullScreen) {
    this.dailyLayoutService.displayFullScreen(isDisplayFullScreen);
  }
}


