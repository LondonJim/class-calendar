import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { DaysModel } from "../models/days.model";
import { ScreenDisplayModel } from "../models/screen-display.model";

@Injectable({
  providedIn: 'root'
})
export class DailyLayoutService {
  STARTING_VALUE = JSON.parse(localStorage.getItem('classCalendar')) || {
    monday: {images: [], canvas: null},
    tuesday: {images: [], canvas: null},
    wednesday: {images: [], canvas: null},
    thursday: {images: [], canvas: null},
    friday: {images: [], canvas: null},
  }
  DAYS_OF_WEEK = ['sunday', 'monday','tuesday','wednesday','thursday','friday', 'saturday'];
  // TODO read cookie to prefill starting value
  dailyLayout: DaysModel = this.STARTING_VALUE;
  dailyLayoutChange: Subject<DaysModel> = new Subject<DaysModel>();
  selectedDay: string;
  selectedDayChange: Subject<string> = new Subject<string>();

  constructor()  {
    const date = new Date();
    const dayNumber = this.DAYS_OF_WEEK[date.getDay()];
    this.selectedDay = dayNumber === 'sunday' || dayNumber === 'saturday' ? 'monday' : this.DAYS_OF_WEEK[date.getDay()];
    this.dailyLayoutChange.subscribe((value) => {
      this.dailyLayout = value;
    });
    this.selectDay(this.selectedDay);
  }

  selectDay(selectedDay) {
    this.selectedDay = selectedDay;
    this.selectedDayChange.next(this.selectedDay);
  }

  saveCanvasData(canvasData: string) {
    this.dailyLayout[this.selectedDay].canvas = canvasData;
    this.dailyLayoutChange.next(this.dailyLayout);
    localStorage.setItem('classCalendar', JSON.stringify(this.dailyLayout));
  }

  addImage(image: ScreenDisplayModel) {
    this.dailyLayout[this.selectedDay].images.push(image);
    this.dailyLayoutChange.next(this.dailyLayout)
  }

  increaseImageSize(index) {
    this.dailyLayout[this.selectedDay].images[index].size = this.dailyLayout[this.selectedDay].images[index].size + 10;
    this.dailyLayoutChange.next(this.dailyLayout);
  }

  decreaseImageSize(index) {
    this.dailyLayout[this.selectedDay].images[index].size = this.dailyLayout[this.selectedDay].images[index].size - 10;
    this.dailyLayoutChange.next(this.dailyLayout);
  }

  increasePosition(index) {
    if (index < this.dailyLayout[this.selectedDay].length - 1) {
      this.dailyLayout[this.selectedDay] = this.moveInArray(this.dailyLayout[this.selectedDay], index, index + 1);
      this.dailyLayoutChange.next(this.dailyLayout);
    }
  }

  decreasePosition(index) {
    if (index > 0) {
      this.dailyLayout[this.selectedDay] = this.moveInArray(this.dailyLayout[this.selectedDay], index, index - 1);
      this.dailyLayoutChange.next(this.dailyLayout);
    }
  }

  removeImage(index) {
    this.dailyLayout[this.selectedDay].images.splice(index, 1);
    this.dailyLayoutChange.next(this.dailyLayout);
  }

  updatePostion(newX, newY, index) {
    this.dailyLayout[this.selectedDay].images[index].x = this.dailyLayout[this.selectedDay].images[index].x + newX;
    this.dailyLayout[this.selectedDay].images[index].y = this.dailyLayout[this.selectedDay].images[index].y + newY;
    this.dailyLayoutChange.next(this.dailyLayout);
  }

  editModeToggle(index) {
    this.dailyLayout[this.selectedDay].images[index].edit = !this.dailyLayout[this.selectedDay].images[index].edit;
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
