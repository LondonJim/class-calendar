import { Component, OnInit } from '@angular/core';
import { ImageDetails } from "src/assets/image-list";
import { DailyLayoutService } from "src/app/services/daily-layout.service";
import { ScreenDisplayModel } from "../models/screen-display.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageDetails = ImageDetails;
  displayedImages: ScreenDisplayModel[];
  day = 'monday';

  constructor(private dailyLayoutService: DailyLayoutService) { }

  ngOnInit(): void {
    this.dailyLayoutService.dailyLayoutChange.subscribe(value => {
      // TODO change so multiple days can be selected
      this.displayedImages = value.monday; // hardcoded 'monday' for now
      console.log(this.displayedImages);
    });
  }
}
