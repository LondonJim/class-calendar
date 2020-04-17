import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
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
  private readonly _dailyLayout = new BehaviorSubject<DaysModel>(this.STARTING_VALUE);

  // readonly dailyLayout$ = this._dailyLayout.asObservable();

  get dailyLayout(): DaysModel {
    return this._dailyLayout.getValue();
  }

  // set dailyLayout(val:DaysModel) {
  //   this._dailyLayout.next(val);
  // }

  addImage(day, image: ScreenDisplayModel) {
    this.dailyLayout[day].push(image);
    console.log(this.dailyLayout);
  }

  removeImage(day, image: ScreenDisplayModel) {
    this.dailyLayout[day] = this.dailyLayout[day].filter(({ index }) => index !== image.index)
  }
}
