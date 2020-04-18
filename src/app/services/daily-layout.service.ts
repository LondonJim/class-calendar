import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { DaysModel } from "../models/days.model";
import { ScreenDisplayModel } from "../models/screen-display.model";

@Injectable({
  providedIn: 'root'
})
export class DailyLayoutService {
  STARTING_VALUE = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  }
  // TODO read cookie to prefill starting value
  dailyLayout: DaysModel = this.STARTING_VALUE;
  dailyLayoutChange: Subject<DaysModel> = new Subject<DaysModel>();

  constructor()  {
    this.dailyLayoutChange.subscribe((value) => {
      this.dailyLayout = value
    });
  }

  addImage(day, image: ScreenDisplayModel) {
    this.dailyLayout[day].push(image);
    this.dailyLayoutChange.next(this.dailyLayout)
    console.log(this.dailyLayout);
  }

  removeImage(day, image: ScreenDisplayModel) {
    this.dailyLayout[day] = this.dailyLayout[day].filter(({ index }) => index !== image.index)
    this.dailyLayoutChange.next(this.dailyLayout)
  }
}
