import { Component, OnInit } from '@angular/core';
import { DailyLayoutService } from "src/app/services/daily-layout.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  days: string[];

  constructor(private dailyLayoutService: DailyLayoutService) { }

  ngOnInit(): void {
    this.days = this.dailyLayoutService.DAYS_OF_WEEK.slice(1, -1);
  }

  selectDay(day) {
    this.dailyLayoutService.selectDay(day);
  }
}
