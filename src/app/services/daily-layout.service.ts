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
      console.log(value);
      this.dailyLayout = value;
    });
  }

  addImage(day, image: ScreenDisplayModel) {
    this.dailyLayout[day].push(image);
    this.dailyLayoutChange.next(this.dailyLayout)
  }

  increaseImageSize(day, index) {
    this.dailyLayout[day][index].size = this.dailyLayout[day][index].size + 10;
    this.dailyLayoutChange.next(this.dailyLayout);
  }

  decreaseImageSize(day, index) {
    this.dailyLayout[day][index].size = this.dailyLayout[day][index].size - 10;
    this.dailyLayoutChange.next(this.dailyLayout);
  }

  increasePosition(day, index) {
    if (index < this.dailyLayout[day].length - 1) {
      this.dailyLayout[day] = this.moveInArray(this.dailyLayout[day], index, index + 1);
      this.dailyLayoutChange.next(this.dailyLayout);
    }
  }

  decreasePosition(day, index) {
    if (index > 0) {
      this.dailyLayout[day] = this.moveInArray(this.dailyLayout[day], index, index - 1);
      this.dailyLayoutChange.next(this.dailyLayout);
    }
  }

  removeImage(day, index) {
    this.dailyLayout[day].splice(index, 1);
    this.dailyLayoutChange.next(this.dailyLayout);
  }

  updatePostion(day, newX, newY, index) {
    this.dailyLayout[day][index].x = this.dailyLayout[day][index].x + newX;
    this.dailyLayout[day][index].y = this.dailyLayout[day][index].y + newY;
    this.dailyLayoutChange.next(this.dailyLayout);
  }

  editModeToggle(day, index) {
    this.dailyLayout[day][index].edit = !this.dailyLayout[day][index].edit;
    this.dailyLayoutChange.next(this.dailyLayout);
  }

  moveInArray(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      let k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }
}
