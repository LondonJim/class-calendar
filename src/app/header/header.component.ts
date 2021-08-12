import { Component, OnInit } from '@angular/core';
import { DailyLayoutService } from "src/app/services/daily-layout.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  days: string[];
  selectedDay;

  constructor(private dailyLayoutService: DailyLayoutService) { }

  ngOnInit(): void {
    this.days = this.dailyLayoutService.DAYS_OF_WEEK.slice(1, -1);
    this.selectedDay = this.dailyLayoutService.selectedDay;

    this.dailyLayoutService.selectedDayChange.subscribe(value => {
      this.selectedDay = this.dailyLayoutService.selectedDay;
    });
  }

  selectDay(day) {
    this.dailyLayoutService.selectDay(day);
  }
}
